
/**
 * Base interface to define the style properties of a layer.
 */
export interface LayerStyle {
  /**
   * Other properties provided by the descendant interfaces.
   */
  [other: string]: any;
  /**
   * The code of the layer. Must match the code of an entry in layers.json.
   */
  code: string;
  /**
   * Shows whether the layer should be visible when the theme is applied.
   */
  visibleOnLoad: boolean;
};
