
/**
 * Wraps parameters defining the visibility of a layer.
 */
// TODO refactor: this object should be removed, the LayerTreeNode.selected can be used instead
export interface LayerVisibility {

  /**
   * The name of the layer.
   */
  layer: string;

  /**
   * The visibility of the layer.
   */
  visible: boolean;

}
