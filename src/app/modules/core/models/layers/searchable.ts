
/**
 * Defines a searchable object.
 */
export interface Searchable {
  /**
   * The type of the object.
   */
  type: string;

  /**
   * The code associated with this object.
   */
  code: string;

  /**
   * The right ascension coordinate of this object.
   */
  ra: number;

  /**
   * The declination coordinate of this object.
   */
  dec: number;

  /**
   * The names of this object, by which it can be found via the search service.
   */
  names: Array<string>;
}
