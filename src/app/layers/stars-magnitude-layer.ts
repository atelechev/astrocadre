import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Points, Object3D } from 'three';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { RenderableText } from '../core/layer/label/renderable-text';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

export class StarsMagnitudeLayer extends RenderableLayer {

  public static readonly LABELTYPE_NAME_PROPER = 'names-proper';

  public static readonly LABELTYPE_NAME_STANDARD = 'names-standard';

  private namesHtmls: Array<HTMLElement>;

  private shownLabelsType: string;

  constructor(tree: LayersTreeNode,
              public readonly magClass: number,
              private readonly stars: Points,
              private readonly properNameLabels: Map<string, RenderableText>,
              private readonly standardNameLabels: Map<string, RenderableText>) {
    super(tree);
    ensureArgDefined(magClass, 'magClass');
    ensureArgDefined(stars, 'stars');
    ensureArgDefined(properNameLabels, 'properNameLabels');
    ensureArgDefined(standardNameLabels, 'standardNameLabels');
    this.extractHtmls();
  }

  private extractHtmls(): void {
    this.namesHtmls = new Array<HTMLElement>();
    this.extractHtmlsFrom(this.properNameLabels);
    this.extractHtmlsFrom(this.standardNameLabels);
  }

  private extractHtmlsFrom(labels: Map<string, RenderableText>): void {
    labels.forEach(
      (renderable: RenderableText, key: string) => this.namesHtmls.push(renderable.getHtmlElement())
    );
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
    [ this.properNameLabels, this.standardNameLabels].forEach(
      (labels: Map<string, RenderableText>) => labels.forEach(
        (renderable: RenderableText, code: string) => renderable.useTheme(theme)
      )
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
