import { Object3D } from 'three';
import { ensureArgDefined } from '#core/arg-validation-utils';
import { TreeNode } from '#core/tree-node';
import { RenderableText } from '#core-layer/label/renderable-text';
import { RenderableLayer } from '#core-layer/renderable-layer';
import { Theme } from '#core-theme/theme';

export class ConstellationNamesLayer extends RenderableLayer {

  private allHtmls: Array<HTMLElement>;

  constructor(tree: TreeNode,
    private renderableLabels: Map<string, RenderableText>) {
    super(tree);
    ensureArgDefined(renderableLabels, 'renderableLabels');
    this.extractHtmls();
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

  private extractHtmls(): void {
    this.allHtmls = new Array<HTMLElement>();
    this.renderableLabels.forEach(
      (renderable: RenderableText, key: string) => this.allHtmls.push(renderable.getHtmlElement())
    );
  }

}
