import { LineStyle } from '#core/models/theme/line-style';

/**
 * Defines the style properties of the sky grid layer.
 */
export interface SkyGridStyle {
  /**
   * The properties of normal lines (most of the lines are "normal").
   */
  normal: LineStyle;
  /**
   * The properties of the reference lines.
   * The reference lines are the equator and the 0th meridian.
   */
  reference: LineStyle;
}
