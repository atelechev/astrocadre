import { ColorStyle } from '#core/models/theme/color-style';

/**
 * Defines the properties of a line shown in the main view.
 */
export interface LineStyle {
  /**
   * The color of the line.
   */
  color: ColorStyle;
  /**
   * The width of the line. Optional.
   * The default value is 1.
   */
  width?: number;
  /**
   * The size of the dashes of the line. Optional.
   * If not defined, a solid line is rendered.
   */
  dash?: number;
  /**
   * The size of the gaps between the dashes of the line. Optional.
   * If not defined, a solid line is rendered.
   */
  gap?: number;
}
