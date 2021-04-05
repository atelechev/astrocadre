
/**
 * Defines the structure of a layer of objects that can be shown in the main view.
 */
export interface Layer {
  /**
   * The code of the layer, which identifies it among all layers.
   * Must be unique.
   */
  code: string;

  /**
   * The array of the definitions of object to show for this layer.
   * The structure of the items in this array depends on the contents of each layer.
   */
  objects: Array<any>;

  /**
   * The label used for this layer in the UI controls.
   */
  label: string;

  /**
   * Shows whether the object definitions of this layer are loaded from a separate resource.
   */
  loadFromUrl: boolean;

  /**
   * A verbose description of this layer.
   */
  description?: string;

  /**
   * The array of sub-layers of this layer.
   */
  subLayers?: Array<Layer>;
}
