import { CelestialBodyStyle } from '#core/models/theme/celestial-body-style';
import { TextStyle } from '#core/models/theme/text-style';

/**
 * Defines the style properties of the Solar system objects layer.
 */
export interface SolarSystemStyle {
  /**
   * Defines the base default style of a shown celestial body,
   * which is applied if no definition is provided for the objects
   * below, or if their properties are missing.
   *
   * The use of this base style allows to avoid the repetitions
   * of the same values in the objects below.
   */
  baseStyle: CelestialBodyStyle;
  /**
   * The style definition of the Sun.
   */
  sun?: CelestialBodyStyle;
  /**
   * The style definition of the Moon.
   */
  moon?: CelestialBodyStyle;
  /**
   * The style definition of Mercury.
   */
  mercury?: CelestialBodyStyle;
  /**
   * The style definition of Venus.
   */
  venus?: CelestialBodyStyle;
  /**
   * The style definition of Mars.
   */
  mars?: CelestialBodyStyle;
  /**
   * The style definition of Jupiter.
   */
  jupiter?: CelestialBodyStyle;
  /**
   * The style definition of Saturn.
   */
  saturn?: CelestialBodyStyle;
  /**
   * The style definition of Uranus.
   */
  uranus?: CelestialBodyStyle;
  /**
   * The style definition of Neptune.
   */
  neptune?: CelestialBodyStyle;
  /**
   * The properties of the labels containing the object names.
   */
  names: TextStyle;
}
