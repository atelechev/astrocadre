import { RenderableLayer } from './renderable-layer';
import { ItemsTreeNode } from '../items-tree-node';
import { RenderableText } from './label/renderable-text';

export abstract class LabelledLayer extends RenderableLayer {

  constructor(tree: ItemsTreeNode) {
    super(tree);
  }

  public abstract getTextElements(): Array<HTMLElement>;

  public abstract getRenderableLabels(): Map<string, RenderableText>;

}
