import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Constants } from '../core/constants';
import { Points, Object3D } from 'three';
import { PointsFactory } from './geometry/points-factory';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { RenderableText } from '../core/layer/label/renderable-text';
import { toVector3 } from '../core/layer/vector-utils';
import { TextOffsetPolicies, TextOffsetPolicy } from '../core/layer/label/text-offset-policy';
import { extractStandardName, extractProperName, toGreekLetter } from './star-name-utils';
import { RenderableLayer } from '../core/layer/renderable-layer';

export class StarsMagnitudeLayer extends RenderableLayer {

  public static readonly LABELTYPE_NAME_PROPER = 'names-proper';

  public static readonly LABELTYPE_NAME_STANDARD = 'names-standard';

  private stars: Points;

  private properNameLabels: Map<string, RenderableText>;

  private namesHtmls: Array<HTMLElement>;

  private standardNameLabels: Map<string, RenderableText>;

  private shownLabelsType: string;

  constructor(tree: LayersTreeNode,
              public readonly magClass: number,
              rawStars: number[][],
              objectsFactory: PointsFactory) {
    super(tree);
    this.stars = objectsFactory.createObject3D(Layers.STARS, rawStars);
    this.namesHtmls = new Array<HTMLElement>();
    this.initProperNameLabels(rawStars);
    this.initStandardNameLabels(rawStars);
  }

  private initStandardNameLabels(rawStars: any[][]): void {
    this.standardNameLabels = new Map<string, RenderableText>();
    rawStars.forEach(
      (rawStar: any[]) => {
        const name = extractStandardName(rawStar);
        if (name) {
          const renderable = this.toStandardNameRenderableText(rawStar, name);
          this.standardNameLabels.set(name, renderable);
          this.namesHtmls.push(renderable.getHtmlElement());
        }
      }
    );
  }

  private toStandardNameRenderableText(rawStar: any[], name: string): RenderableText {
    const greekLetter = toGreekLetter(name);
    return this.toNameRenderableText(rawStar,
                                     StarsMagnitudeLayer.LABELTYPE_NAME_STANDARD,
                                     greekLetter,
                                     TextOffsetPolicies.CLOSE_RIGHT);
  }

  private initProperNameLabels(rawStars: any[][]): void {
    this.properNameLabels = new Map<string, RenderableText>();
    rawStars.forEach(
      (rawStar: any[]) => {
        const name = extractProperName(rawStar);
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
    const center = toVector3(rawStar[0], rawStar[1], Constants.getWorldRadiusForLayer(Layers.STARS));
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
