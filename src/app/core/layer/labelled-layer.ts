import { RenderableLayer } from './renderable-layer';
import { LayersTreeNode } from './layers-tree-node';
import { RenderableText } from './label/renderable-text';

/**
 * Provides RenderableLayer the ability to use text labels.
 */
export abstract class LabelledLayer extends RenderableLayer {

  private labelsShown: boolean;

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

  /**
   * Returns true if the text/labels associated with this layer should be shown.
   */
  public isLabelsShown(): boolean {
    return this.labelsShown;
  }

  /**
   * Sets the visibility of text/labels assiciated with this layer.
   *
   * @param show true to show the labels.
   */
  public setLabelsShown(show: boolean): void {
    this.labelsShown = show;
  }

}
