import { TextStyle } from '#core/models/theme/text-style';
import { TextureStyle } from '#core/models/theme/texture-style';

/**
 * Defines the style properties of the Messier objects layer.
 */
export interface MessierObjectsStyle {
  /**
   * Groups the style properties of the objects.
   */
  objects: {
    /**
     * The properties of a stars cluster object.
     */
    cluster: TextureStyle;
    /**
     * The properties of a galaxy object.
     */
    galaxy: TextureStyle;
    /**
     * The properties of a nebula object.
     */
    nebula: TextureStyle;
    /**
     * The properties of other objects.
     */
    other: TextureStyle;
  };
  /**
   * The properties of the labels containing the object names.
   */
  names: TextStyle;
}
