
/**
 * Defines a point in the sky, on a virtual sphere with the origin in the center.
 */
export interface SkyCoordinate {
  /**
   * The right ascension value in decimal degrees, between 0 and 360.
   */
  rightAscension: number;

  /**
   * The declination value in decimal degrees, between -90 and 90.
   */
  declination: number;
}
