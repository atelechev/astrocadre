import { RenderableLayer } from './renderable-layer';
import { LayersTreeNode } from './layers-tree-node';
import { RenderableText } from './label/renderable-text';

/**
 * Provides RenderableLayer the ability to use text labels.
 */
export abstract class LabelledLayer extends RenderableLayer {

  constructor(tree: LayersTreeNode) {
    super(tree);
  }

  /**
   * Returns the array of HTMLElements with text contents to show for this layer.
   */
  public abstract getTextElements(): Array<HTMLElement>;

  /**
   * Returns the Map of existing RenderableText items and their identifiers, registered for this layer.
   */
  public abstract getRenderableLabels(): Map<string, RenderableText>;

}
