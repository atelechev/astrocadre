import { Object3D } from 'three';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { RenderableText } from '../core/layer/label/renderable-text';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

export class ConstellationNamesLayer extends RenderableLayer {

  private allHtmls: Array<HTMLElement>;

  constructor(tree: LayersTreeNode,
              private renderableLabels: Map<string, RenderableText>) {
    super(tree);
    ensureArgDefined(renderableLabels, 'renderableLabels');
    this.extractHtmls();
  }

  private extractHtmls(): void {
    this.allHtmls = new Array<HTMLElement>();
    this.renderableLabels.forEach(
      (renderable: RenderableText, key: string) => this.allHtmls.push(renderable.getHtmlElement())
    );
  }

  public getObjects(): Array<Object3D> {
    return [];
  }

  public getTextElements(): Array<HTMLElement> {
    return this.allHtmls;
  }

  public useThemeForThis(theme: Theme): void {
    this.renderableLabels.forEach(
      (renderable: RenderableText, code: string) => renderable.useTheme(theme)
    );
  }

  public getRenderableLabels(): Map<string, RenderableText> {
    return this.renderableLabels;
  }

}
