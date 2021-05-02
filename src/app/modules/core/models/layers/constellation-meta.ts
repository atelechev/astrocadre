
/**
 * Wraps the metadata about a constellation.
 */
export interface ConstellationMeta {
  /**
   * The standard code of the constellation.
   */
  code: string;

  /**
   * The right ascension of the center point of the constellation.
   */
  ra: number;

  /**
   * The declination of the center point of the constellation.
   */
  dec: number;

  /**
   * The array of names that denote this constellation.
   */
  names?: Array<string>;
}
