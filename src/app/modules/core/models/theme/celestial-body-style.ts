import { LineStyle } from '#core/models/theme/line-style';
import { TextureStyle } from '#core/models/theme/texture-style';

/**
 * Defines the style properties of a celestial body.
 */
export interface CelestialBodyStyle {
  texture: TextureStyle;
  path: LineStyle;
};
