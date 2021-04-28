import { LayerStyle } from '#core/models/theme/layer-style';
import { LineStyle } from '#core/models/theme/line-style';
import { TextStyle } from '#core/models/theme/text-style';

/**
 * Defines the style properties of the constellations layer.
 */
export interface ConstellationsStyle extends LayerStyle {
  /**
   * The properties of the lines representing the boundaries separating the constellations.
   */
  boundaries: LineStyle;
  /**
   * The properties of the lines linking the stars of a constellation.
   */
  lines: LineStyle;
  /**
   * The properties of the labels containing the constellations names.
   */
  names: TextStyle;
}
