import { RenderableLayer } from './renderable-layer';
import { ItemsTreeNode } from './items-tree-node';

export abstract class TextLayer extends RenderableLayer {

  constructor(tree: ItemsTreeNode) {
    super(tree);
  }

  public abstract getTextElements(): Array<HTMLElement>;

  public setVisible(visible: boolean): void {
    super.setVisible(visible);
    this.getTextElements().forEach(
      htmlElement => htmlElement.style.display = 'none');
  }

}
