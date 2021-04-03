import { Vector3 } from 'three';
import { SupportedLayers } from '#core/models/supported-layers';
import { WorldConstants } from '#core/models/world-constants';
import { toVector3 } from '#core/utils/vector-utils';

const initCharMappings = (): Map<string, string> => {
  const charsMap = new Map<string, string>();
  charsMap.set('alp', 'α');
  charsMap.set('bet', 'β');
  charsMap.set('gam', 'γ');
  charsMap.set('del', 'δ');
  charsMap.set('eps', 'ε');
  charsMap.set('zet', 'ζ');
  charsMap.set('eta', 'η');
  charsMap.set('the', 'θ');
  charsMap.set('iot', 'ι');
  charsMap.set('kap', 'κ');
  charsMap.set('lam', 'λ');
  charsMap.set('mu', 'μ');
  charsMap.set('nu', 'ν');
  charsMap.set('xi', 'ξ');
  charsMap.set('omi', 'ο');
  charsMap.set('pi', 'π');
  charsMap.set('rho', 'ρ');
  charsMap.set('sig', 'σ');
  charsMap.set('tau', 'τ');
  charsMap.set('ups', 'υ');
  charsMap.set('phi', 'φ');
  charsMap.set('chi', 'χ');
  charsMap.set('psi', 'ψ');
  charsMap.set('ome', 'ω');
  return charsMap;
};

const CHAR_MAPPINGS = initCharMappings();

/**
 * Returns the Greek character corresponding to the specified standard name of the star.
 *
 * @param stdName the standard name of a star.
 *
 * @returns string the corresponding Greek letter.
 * @throws Error if the Greek letter cannot be extracted from the specified arg.
 */
export const toGreekLetter = (stdName: string): string => {
  if (!stdName) {
    throw new Error('Undefined stdName arg.');
  }
  const greekLetterPartEnd = stdName.indexOf(' ');
  const greekKey = (greekLetterPartEnd > -1 ? stdName.substring(0, greekLetterPartEnd) : stdName).toLowerCase();
  if (!CHAR_MAPPINGS.has(greekKey)) {
    throw new Error('Unmapped or unsupported character to map: ' + greekKey);
  }
  return CHAR_MAPPINGS.get(greekKey);
};

/**
 * Returns true if the arg matches a standard star name, for example 'BET CET'.
 *
 * @param name the standard name to test.
 *
 * @returns boolean true if the arg matches.
 */
export const isStandardName = (name: string): boolean => {
  if (!name || name.length === 0) {
    return false;
  }
  try {
    toGreekLetter(name);
    return true;
  } catch (ex) {
    return false;
  }
};

/**
 * The index at which the first name value (proper or standard) might appear in a raw star data array.
 */
const firstNameIndex = 3;

/**
 * Extracts the string corresponding to the standard name value from the specified raw star data
 * received from JSON.
 * The standard name is a three-letters representation of a Greek letter, for example 'BET CET'.
 *
 * @param rawStar raw star data having the format [ ra, dec, mag, ?properName, ?stdName ].
 */
export const extractStandardName = (rawStar: Array<any>): string => {
  if (rawStar && rawStar.length > firstNameIndex) {
    if (rawStar.length > firstNameIndex + 1) {
      return rawStar[rawStar.length - 1];
    }
    if (isStandardName(rawStar[firstNameIndex])) {
      return rawStar[firstNameIndex];
    }
  }
  return undefined;
};

/**
 * Extracts the string corresponding to the proper name value from the specified raw star data
 * received from JSON.
 *
 * @param rawStar raw star data having the format [ ra, dec, mag, ?properName, ?stdName ].
 */
export const extractProperName = (rawStar: Array<any>): string => {
  if (rawStar &&
    rawStar.length > firstNameIndex &&
    !isStandardName(rawStar[firstNameIndex])) {
    return rawStar[firstNameIndex];
  }
  return undefined;
};

export const buildCenterPoint = (rawStar: Array<any>): Vector3 => toVector3(
  rawStar[0],
  rawStar[1],
  WorldConstants.worldRadiusForLayer(SupportedLayers.STARS)
);
