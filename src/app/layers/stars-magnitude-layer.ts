import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Constants } from '../core/constants';
import { Points, Object3D } from 'three';
import { MergedPoints } from './geometry/merged-points';
import { ItemsTreeNode } from '../core/items-tree-node';
import { LabelledLayer } from '../core/layer/labelled-layer';
import { RenderableText } from '../core/renderable-text';
import { StandardNameConverter } from './standard-name-converter';
import { VectorUtil } from './geometry/vector-util';
import { TextOffsetPolicies, TextOffsetPolicy } from '../core/text-offset-policy';

export class StarsMagnitudeLayer extends LabelledLayer {

  public static readonly LABELTYPE_NAME_PROPER = 'names-proper';

  public static readonly LABELTYPE_NAME_STANDARD = 'names-standard';

  private firstNameIndex = 3;

  private stars: Points;

  private properNameLabels: Map<string, RenderableText>;

  private namesHtmls: Array<HTMLElement>;

  private standardNameLabels: Map<string, RenderableText>;

  private shownLabelsType: string;

  constructor(tree: ItemsTreeNode,
              public readonly magClass: number,
              rawStars: number[][]) {
    super(tree);
    this.stars = new MergedPoints(rawStars, Constants.WORLD_RADIUS - 0.04).toObject3D();
    this.namesHtmls = new Array<HTMLElement>();
    this.initProperNameLabels(rawStars);
    this.initStandardNameLabels(rawStars);
  }

  private initStandardNameLabels(rawStars: any[][]): void {
    this.standardNameLabels = new Map<string, RenderableText>();
    rawStars.forEach(
      (rawStar: any[]) => {
        const name = this.extractStandardName(rawStar);
        if (name) {
          const renderable = this.toStandardNameRenderableText(rawStar, name);
          this.standardNameLabels.set(name, renderable);
          this.namesHtmls.push(renderable.getHtmlElement());
        }
      }
    );
  }

  private extractStandardName(rawStar: any[]): string | undefined {
    if (rawStar.length > this.firstNameIndex) {
      if (rawStar.length > this.firstNameIndex + 1) {
        return rawStar[rawStar.length - 1];
      }
      if (StandardNameConverter.isStandardName(rawStar[this.firstNameIndex])) {
        return rawStar[this.firstNameIndex];
      }
    }
    return undefined;
  }

  private toStandardNameRenderableText(rawStar: any[], name: string): RenderableText {
    const greekLetter = StandardNameConverter.toGreekLetter(name);
    return this.toNameRenderableText(rawStar,
                                     StarsMagnitudeLayer.LABELTYPE_NAME_STANDARD,
                                     greekLetter,
                                     TextOffsetPolicies.CLOSE_RIGHT);
  }

  private extractProperName(rawStar: any[]): string | undefined {
    if (rawStar.length > this.firstNameIndex &&
       !StandardNameConverter.isStandardName(rawStar[this.firstNameIndex])) {
      return rawStar[this.firstNameIndex];
    }
    return undefined;
  }

  private initProperNameLabels(rawStars: any[][]): void {
    this.properNameLabels = new Map<string, RenderableText>();
    rawStars.forEach(
      (rawStar: any[]) => {
        const name = this.extractProperName(rawStar);
        if (name) {
          const renderable = this.toProperNameRenderableText(rawStar, name);
          this.properNameLabels.set(name, renderable);
          this.namesHtmls.push(renderable.getHtmlElement());
        }
      }
    );
  }

  private toProperNameRenderableText(rawStar: any[], name): RenderableText {
    return this.toNameRenderableText(rawStar,
                                     StarsMagnitudeLayer.LABELTYPE_NAME_PROPER,
                                     name,
                                     TextOffsetPolicies.TOP_RIGHT);
  }

  private toNameRenderableText(rawStar: any[], styleKey: string, name: string, offsetPolicy: TextOffsetPolicy): RenderableText {
    const center = VectorUtil.toVector3(rawStar[0], rawStar[1], Constants.WORLD_RADIUS);
    return new RenderableText(this.getName(), styleKey, center, name, offsetPolicy);
  }

  public useThemeForThis(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  private useThemeForObjects(theme: Theme): void {
    const materialKey = 'star-' + this.magClass.toFixed(1);
    const material = theme.getMaterialForLayer(Layers.STARS, materialKey);
    this.stars.material = material;
    material.needsUpdate = true;
  }

  private useThemeForLabels(theme: Theme): void {
    this.properNameLabels.forEach(
      (renderable: RenderableText, code: string) => renderable.useTheme(theme)
    );
    this.standardNameLabels.forEach(
      (renderable: RenderableText, code: string) => renderable.useTheme(theme)
    );
  }

  public getObjects(): Array<Object3D> {
    return [ this.stars ];
  }

  public getTextElements(): Array<HTMLElement> {
    return this.namesHtmls;
  }

  public getRenderableLabels(): Map<string, RenderableText> {
    switch (this.shownLabelsType) {
      case StarsMagnitudeLayer.LABELTYPE_NAME_PROPER:
        return this.properNameLabels;
      case StarsMagnitudeLayer.LABELTYPE_NAME_STANDARD:
        return this.standardNameLabels;
      default:
        return new Map<string, RenderableText>();
    }
  }

  public setShownLabelsType(labelsType: string): void {
    this.shownLabelsType = labelsType;
  }

}
