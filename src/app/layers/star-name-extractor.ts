import { StandardNameConverter } from './standard-name-converter';

/**
 * Provides methods to extract star names from raw JSON data received from backend.
 */
export class StarNameExtractor {

  private static readonly firstNameIndex = 3;

  public static extractStandardName(rawStar: any[]): string {
    if (rawStar &&
        rawStar.length > this.firstNameIndex) {
      if (rawStar.length > this.firstNameIndex + 1) {
        return rawStar[rawStar.length - 1];
      }
      if (StandardNameConverter.isStandardName(rawStar[this.firstNameIndex])) {
        return rawStar[this.firstNameIndex];
      }
    }
    return undefined;
  }

  public static extractProperName(rawStar: any[]): string {
    if (rawStar &&
        rawStar.length > this.firstNameIndex &&
        !StandardNameConverter.isStandardName(rawStar[this.firstNameIndex])) {
      return rawStar[this.firstNameIndex];
    }
    return undefined;
  }

}
