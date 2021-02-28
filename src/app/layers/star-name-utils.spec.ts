import { extractStandardName, extractProperName } from '#layers/star-name-utils';
import { toGreekLetter, isStandardName } from '#layers/star-name-utils';

describe('star-name-utils', () => {

  const assertLetterExpected = (checked: string, expected: string) => {
    expect(checked).toBeDefined();
    expect(checked).toEqual(expected);
  };

  const assertErrorExpected = (arg: string, errorMessage: string) => {
    expect(() => toGreekLetter(arg)).toThrow(new Error(errorMessage));
  };

  it('#toGreekLetter should return α for Alp ZZZ', () => {
    assertLetterExpected(toGreekLetter('Alp ZZZ'), 'α');
  });

  it('#toGreekLetter should return β for Bet ZZZ', () => {
    assertLetterExpected(toGreekLetter('Bet ZZZ'), 'β');
  });

  it('#toGreekLetter should return γ for Gam ZZZ', () => {
    assertLetterExpected(toGreekLetter('Gam ZZZ'), 'γ');
  });

  it('#toGreekLetter should return δ for Del ZZZ', () => {
    assertLetterExpected(toGreekLetter('Del ZZZ'), 'δ');
  });

  it('#toGreekLetter should return ε for Eps ZZZ', () => {
    assertLetterExpected(toGreekLetter('Eps ZZZ'), 'ε');
  });

  it('#toGreekLetter should return ζ for Zet ZZZ', () => {
    assertLetterExpected(toGreekLetter('Zet ZZZ'), 'ζ');
  });

  it('#toGreekLetter should return η for Eta ZZZ', () => {
    assertLetterExpected(toGreekLetter('Eta ZZZ'), 'η');
  });

  it('#toGreekLetter should return θ for The ZZZ', () => {
    assertLetterExpected(toGreekLetter('The ZZZ'), 'θ');
  });

  it('#toGreekLetter should return ι for Iot ZZZ', () => {
    assertLetterExpected(toGreekLetter('Iot ZZZ'), 'ι');
  });

  it('#toGreekLetter should return κ for Kap ZZZ', () => {
    assertLetterExpected(toGreekLetter('Kap ZZZ'), 'κ');
  });

  it('#toGreekLetter should return λ for Lam ZZZ', () => {
    assertLetterExpected(toGreekLetter('Lam ZZZ'), 'λ');
  });

  it('#toGreekLetter should return μ for Mu ZZZ', () => {
    assertLetterExpected(toGreekLetter('Mu ZZZ'), 'μ');
  });

  it('#toGreekLetter should return ν for Nu ZZZ', () => {
    assertLetterExpected(toGreekLetter('Nu ZZZ'), 'ν');
  });

  it('#toGreekLetter should return ξ for Xi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Xi ZZZ'), 'ξ');
  });

  it('#toGreekLetter should return ο for Omi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Omi ZZZ'), 'ο');
  });

  it('#toGreekLetter should return π for Pi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Pi ZZZ'), 'π');
  });

  it('#toGreekLetter should return ρ for Rho ZZZ', () => {
    assertLetterExpected(toGreekLetter('Rho ZZZ'), 'ρ');
  });

  it('#toGreekLetter should return σ for Sig ZZZ', () => {
    assertLetterExpected(toGreekLetter('Sig ZZZ'), 'σ');
  });

  it('#toGreekLetter should return τ for Tau ZZZ', () => {
    assertLetterExpected(toGreekLetter('Tau ZZZ'), 'τ');
  });

  it('#toGreekLetter should return υ for Ups ZZZ', () => {
    assertLetterExpected(toGreekLetter('Ups ZZZ'), 'υ');
  });

  it('#toGreekLetter should return φ for Phi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Phi ZZZ'), 'φ');
  });

  it('#toGreekLetter should return χ for Chi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Chi ZZZ'), 'χ');
  });

  it('#toGreekLetter should return ψ for Psi ZZZ', () => {
    assertLetterExpected(toGreekLetter('Psi ZZZ'), 'ψ');
  });

  it('#toGreekLetter should return ω for Ome ZZZ', () => {
    assertLetterExpected(toGreekLetter('Ome ZZZ'), 'ω');
  });


  it('#toGreekLetter should return ω for Ome', () => {
    assertLetterExpected(toGreekLetter('Ome'), 'ω');
  });

  it('#toGreekLetter should throw expected error for undefined arg', () => {
    assertErrorExpected(undefined, 'Undefined stdName arg.');
  });

  it('#toGreekLetter should throw expected error for empty arg', () => {
    assertErrorExpected('', 'Undefined stdName arg.');
  });

  it('#toGreekLetter should throw expected error for unsupported char key', () => {
    assertErrorExpected('a', 'Unmapped or unsupported character to map: a');
  });


  it('#isStandardName should return false for undefined arg', () => {
    expect(isStandardName(undefined)).toBeFalsy();
  });

  it('#isStandardName should return false for empty arg', () => {
    expect(isStandardName('')).toBeFalsy();
  });

  it('#isStandardName should return false for non-standard name arg', () => {
    expect(isStandardName('Mizar')).toBeFalsy();
  });

  it('#isStandardName should return true for standard name arg', () => {
    expect(isStandardName('Alp UMa')).toBeTruthy();
  });


  it('#extractStandardName should return undefined if arg is undefined', () => {
    expect(extractStandardName(undefined)).toBeUndefined();
  });

  it('#extractStandardName should return undefined if arg does not contain names', () => {
    const rawStar = [0.33, -50.34, 5.5];
    expect(extractStandardName(rawStar)).toBeUndefined();
  });

  it('#extractStandardName should return undefined if arg contains proper name only', () => {
    const rawStar = [1.99, -59.99, 5.7, 'test'];
    expect(extractStandardName(rawStar)).toBeUndefined();
  });

  it('#extractStandardName should return expected standard name if only standard name is present', () => {
    const rawStar = [0.27, -48.81, 5.7, 'TAU PHE'];
    expect(extractStandardName(rawStar)).toBe('TAU PHE');
  });

  it('#extractStandardName should return expected standard name if both standard and proper names are present', () => {
    const rawStar = [0.27, -48.81, 5.7, 'test', 'TAU PHE'];
    expect(extractStandardName(rawStar)).toBe('TAU PHE');
  });

  it('#extractProperName should return undefined if arg is undefined', () => {
    expect(extractProperName(undefined)).toBeUndefined();
  });

  it('#extractProperName should return undefined if arg does not contain names', () => {
    const rawStar = [0.33, -50.34, 5.5];
    expect(extractProperName(rawStar)).toBeUndefined();
  });

  it('#extractProperName should return undefined if arg contains standard name only', () => {
    const rawStar = [0.27, -48.81, 5.7, 'TAU PHE'];
    expect(extractProperName(rawStar)).toBeUndefined();
  });

  it('#extractProperName should return expected proper name if only proper name is present', () => {
    const rawStar = [1.99, -59.99, 5.7, 'test'];
    expect(extractProperName(rawStar)).toBe('test');
  });

  it('#extractProperName should return expected proper name if both proper and standard names are present', () => {
    const rawStar = [1.99, -59.99, 5.7, 'test', 'TAU ZXE'];
    expect(extractProperName(rawStar)).toBe('test');
  });

});
