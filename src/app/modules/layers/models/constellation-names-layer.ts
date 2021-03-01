import { Object3D } from 'three';
import { RenderableLayer } from '#core/models/renderable-layer';
import { RenderableText } from '#core/models/renderable-text';
import { Theme } from '#core/models/theme';
import { TreeNode } from '#core/models/tree-node';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';

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
