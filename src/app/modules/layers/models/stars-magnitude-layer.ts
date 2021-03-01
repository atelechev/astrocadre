import { Object3D, Points } from 'three';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';
import { Layers } from '#core/models/layers';
import { TreeNode } from '#core/models/tree-node';
import { RenderableText } from '#core/models/renderable-text';
import { RenderableLayer } from '#core/models/renderable-layer';
import { Theme } from '#core/models/theme';

export class StarsMagnitudeLayer extends RenderableLayer {

  public static readonly LABELTYPE_NAME_PROPER = 'names-proper';

  public static readonly LABELTYPE_NAME_STANDARD = 'names-standard';

  private namesHtmls: Array<HTMLElement>;

  private shownLabelsType: string;

  constructor(tree: TreeNode,
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

  public useThemeForThis(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  public getObjects(): Array<Object3D> {
    return [this.stars];
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

  private useThemeForObjects(theme: Theme): void {
    const materialKey = 'star-' + this.magClass.toFixed(1);
    const material = theme.getMaterialForLayer(Layers.STARS, materialKey);
    this.stars.material = material;
    material.needsUpdate = true;
  }

  private useThemeForLabels(theme: Theme): void {
    [this.properNameLabels, this.standardNameLabels].forEach(
      (labels: Map<string, RenderableText>) => labels.forEach(
        (renderable: RenderableText, code: string) => renderable.useTheme(theme)
      )
    );
  }

}
