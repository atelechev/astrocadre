import { Searchable } from '#core/models/layers/searchable';

/**
 * Represents the raw data structure loaded from the JSON file.
 */
export interface RawConstellations {
  boundaries: Array<Array<number>>;
  lines: Array<Array<number>>;
  names: Array<Searchable>;
}
