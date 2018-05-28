
/**
 * Wraps metadata about a constellation.
 */
export class ConstellationMetadata {

  constructor(public readonly code: string,
              public readonly ra: number,
              public readonly dec: number,
              public readonly names: string[]) {

  }

}
