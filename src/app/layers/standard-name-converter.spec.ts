import { StandardNameConverter } from './standard-name-converter';


describe('StandardNameConverter', () => {

  const util = StandardNameConverter;

  const assertLetterExpected = (checked: string, expected: string) => {
    expect(checked).toBeDefined();
    expect(checked).toEqual(expected);
  };

  const assertErrorExpected = (arg: string, errorMessage: string) => {
    expect(() => util.toGreekLetter(arg)).toThrow(new Error(errorMessage));
  };

  it('#toGreekLetter should return α for Alp ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Alp ZZZ'), 'α');
  });

  it('#toGreekLetter should return β for Bet ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Bet ZZZ'), 'β');
  });

  it('#toGreekLetter should return γ for Gam ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Gam ZZZ'), 'γ');
  });

  it('#toGreekLetter should return δ for Del ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Del ZZZ'), 'δ');
  });

  it('#toGreekLetter should return ε for Eps ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Eps ZZZ'), 'ε');
  });

  it('#toGreekLetter should return ζ for Zet ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Zet ZZZ'), 'ζ');
  });

  it('#toGreekLetter should return η for Eta ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Eta ZZZ'), 'η');
  });

  it('#toGreekLetter should return θ for The ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('The ZZZ'), 'θ');
  });

  it('#toGreekLetter should return ι for Iot ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Iot ZZZ'), 'ι');
  });

  it('#toGreekLetter should return κ for Kap ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Kap ZZZ'), 'κ');
  });

  it('#toGreekLetter should return λ for Lam ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Lam ZZZ'), 'λ');
  });

  it('#toGreekLetter should return μ for Mu ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Mu ZZZ'), 'μ');
  });

  it('#toGreekLetter should return ν for Nu ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Nu ZZZ'), 'ν');
  });

  it('#toGreekLetter should return ξ for Xi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Xi ZZZ'), 'ξ');
  });

  it('#toGreekLetter should return ο for Omi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Omi ZZZ'), 'ο');
  });

  it('#toGreekLetter should return π for Pi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Pi ZZZ'), 'π');
  });

  it('#toGreekLetter should return ρ for Rho ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Rho ZZZ'), 'ρ');
  });

  it('#toGreekLetter should return σ for Sig ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Sig ZZZ'), 'σ');
  });

  it('#toGreekLetter should return τ for Tau ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Tau ZZZ'), 'τ');
  });

  it('#toGreekLetter should return υ for Ups ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Ups ZZZ'), 'υ');
  });

  it('#toGreekLetter should return φ for Phi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Phi ZZZ'), 'φ');
  });

  it('#toGreekLetter should return χ for Chi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Chi ZZZ'), 'χ');
  });

  it('#toGreekLetter should return ψ for Psi ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Psi ZZZ'), 'ψ');
  });

  it('#toGreekLetter should return ω for Ome ZZZ', () => {
    assertLetterExpected(util.toGreekLetter('Ome ZZZ'), 'ω');
  });


  it('#toGreekLetter should return ω for Ome', () => {
    assertLetterExpected(util.toGreekLetter('Ome'), 'ω');
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
    expect(util.isStandardName(undefined)).toBeFalsy();
  });

  it('#isStandardName should return false for empty arg', () => {
    expect(util.isStandardName('')).toBeFalsy();
  });

  it('#isStandardName should return false for non-standard name arg', () => {
    expect(util.isStandardName('Mizar')).toBeFalsy();
  });

  it('#isStandardName should return true for standard name arg', () => {
    expect(util.isStandardName('Alp UMa')).toBeTruthy();
  });

});
