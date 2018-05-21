import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';
import { Points, Object3D } from 'three';
import { MergedPoints } from './geometry/merged-points';
import { ItemsTreeNode } from '../core/items-tree-node';
import { LabelledLayer } from '../core/labelled-layer';
import { RenderableText } from '../core/renderable-text';
import { StandardNameConverter } from './standard-name-converter';
import { VectorUtil } from './geometry/vector-util';
import { TextOffsetPolicies } from '../core/text-offset-policy';

export class StarsMagnitudeLayer extends LabelledLayer {

  private stars: Points;

  private properNameLabels: Map<string, RenderableText>;

  private properNameHtmls: Array<HTMLElement>;

  constructor(tree: ItemsTreeNode,
              public readonly magClass: number,
              rawStars: number[][]) {
    super(tree);
    this.stars = new MergedPoints(rawStars, Constants.WORLD_RADIUS - 0.04).toObject3D();
    this.initProperNameLabels(rawStars);
  }

  private initProperNameLabels(rawStars: any[][]): void {
    this.properNameLabels = new Map<string, RenderableText>();
    this.properNameHtmls = new Array<HTMLElement>();
    const firstNameIndex = 3;
    rawStars.forEach(
      (rawStar: any[]) => {
        if (rawStar.length > firstNameIndex && !StandardNameConverter.isStandardName(rawStar[firstNameIndex])) {
          const renderable = this.toRenderableText(rawStar);
          this.properNameLabels.set(rawStar[firstNameIndex], renderable);
          this.properNameHtmls.push(renderable.getHtmlElement());
        }
      }
    );
  }

  private toRenderableText(rawStar: any[]): RenderableText {
    const center = VectorUtil.toVector3(rawStar[0], rawStar[1], Constants.WORLD_RADIUS);
    return new RenderableText(this.getName(), 'names-proper', center, rawStar[3], TextOffsetPolicies.TOP_RIGHT);
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
  }

  public getObjects(): Array<Object3D> {
    return [ this.stars ];
  }

  public getTextElements(): Array<HTMLElement> {
    // TODO
    return this.properNameHtmls;
  }

  public getRenderableLabels(): Map<string, RenderableText> {
    // TODO
    return this.properNameLabels;
  }

}
