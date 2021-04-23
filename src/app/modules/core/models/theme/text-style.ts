import { ColorStyle } from '#core/models/theme/color-style';

/**
 * Defines the style properties of a text element shown in the main view.
 *
 * These are standard CSS properties for text elements.
 */
export interface TextStyle {
  fontSize: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  color: ColorStyle;
}
