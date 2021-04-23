import { TextStyle } from '#core/models/theme/text-style';
import { TextureStyle } from '#core/models/theme/texture-style';

/**
 * Defines the style properties of the stars layer.
 */
export interface StarsStyle {
  /**
   * Lists the star magnitudes to show in the view.
   */
  magnitudes: number[];
  /**
   * The texture to use for a star.
   */
  texture: TextureStyle;
  /**
   * The properties of the labels containing the star names.
   */
  names: {
    /**
     * The style of the proper names of the stars.
     */
    proper: TextStyle;
    /**
     * The style of the standard names of the stars.
     */
    standard: TextStyle;
  };
}
