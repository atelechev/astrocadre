import { LineStyle } from '#core/models/theme/line-style';
import { TextureStyle } from '#core/models/theme/texture-style';

/**
 * Defines the style properties of a celestial body.
 */
export interface CelestialBodyStyle {
  /**
   * The properties of the texture used to represent the object.
   */
  texture: TextureStyle;

  /**
   * The properties of the apparent path (trajectory) of the object.
   */
  path: LineStyle;
};
