import { RenderableLayer } from './renderable-layer';
import { ItemsTreeNode } from './items-tree-node';
import { RenderableText } from './renderable-text';

export abstract class TextLayer extends RenderableLayer {

  constructor(tree: ItemsTreeNode) {
    super(tree);
  }

  public abstract getTextElements(): Array<HTMLElement>;

  public abstract getRenderableLabels(): Map<string, RenderableText>;

}
