import {
  extractProperName,
  extractStandardName,
  isStandardName,
  toGreekLetter
} from '#core/utils/star-utils';

describe('star-utils', () => {

  const assertLetterExpected = (checked: string, expected: string) => {
    expect(checked).toBeDefined();
    expect(checked).toEqual(expected);
  };

  const assertErrorExpected = (arg: string, errorMessage: string) => {
    expect(() => toGreekLetter(arg)).toThrow(new Error(errorMessage));
  };

  describe('toGreekLetter should', () => {

    describe('return', () => {

      it('α for Alp ZZZ', () => {
        assertLetterExpected(toGreekLetter('Alp ZZZ'), 'α');
      });

      it('β for Bet ZZZ', () => {
        assertLetterExpected(toGreekLetter('Bet ZZZ'), 'β');
      });

      it('γ for Gam ZZZ', () => {
        assertLetterExpected(toGreekLetter('Gam ZZZ'), 'γ');
      });

      it('δ for Del ZZZ', () => {
        assertLetterExpected(toGreekLetter('Del ZZZ'), 'δ');
      });

      it('ε for Eps ZZZ', () => {
        assertLetterExpected(toGreekLetter('Eps ZZZ'), 'ε');
      });

      it('ζ for Zet ZZZ', () => {
        assertLetterExpected(toGreekLetter('Zet ZZZ'), 'ζ');
      });

      it('η for Eta ZZZ', () => {
        assertLetterExpected(toGreekLetter('Eta ZZZ'), 'η');
      });

      it('θ for The ZZZ', () => {
        assertLetterExpected(toGreekLetter('The ZZZ'), 'θ');
      });

      it('ι for Iot ZZZ', () => {
        assertLetterExpected(toGreekLetter('Iot ZZZ'), 'ι');
      });

      it('κ for Kap ZZZ', () => {
        assertLetterExpected(toGreekLetter('Kap ZZZ'), 'κ');
      });

      it('λ for Lam ZZZ', () => {
        assertLetterExpected(toGreekLetter('Lam ZZZ'), 'λ');
      });

      it('μ for Mu ZZZ', () => {
        assertLetterExpected(toGreekLetter('Mu ZZZ'), 'μ');
      });

      it('ν for Nu ZZZ', () => {
        assertLetterExpected(toGreekLetter('Nu ZZZ'), 'ν');
      });

      it('ξ for Xi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Xi ZZZ'), 'ξ');
      });

      it('ο for Omi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Omi ZZZ'), 'ο');
      });

      it('π for Pi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Pi ZZZ'), 'π');
      });

      it('ρ for Rho ZZZ', () => {
        assertLetterExpected(toGreekLetter('Rho ZZZ'), 'ρ');
      });

      it('σ for Sig ZZZ', () => {
        assertLetterExpected(toGreekLetter('Sig ZZZ'), 'σ');
      });

      it('τ for Tau ZZZ', () => {
        assertLetterExpected(toGreekLetter('Tau ZZZ'), 'τ');
      });

      it('υ for Ups ZZZ', () => {
        assertLetterExpected(toGreekLetter('Ups ZZZ'), 'υ');
      });

      it('φ for Phi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Phi ZZZ'), 'φ');
      });

      it('χ for Chi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Chi ZZZ'), 'χ');
      });

      it('ψ for Psi ZZZ', () => {
        assertLetterExpected(toGreekLetter('Psi ZZZ'), 'ψ');
      });

      it('ω for Ome ZZZ', () => {
        assertLetterExpected(toGreekLetter('Ome ZZZ'), 'ω');
      });


      it('ω for Ome', () => {
        assertLetterExpected(toGreekLetter('Ome'), 'ω');
      });

    });

    describe('throw expected error', () => {

      it('for undefined arg', () => {
        assertErrorExpected(undefined, 'Undefined stdName arg.');
      });

      it('for empty arg', () => {
        assertErrorExpected('', 'Undefined stdName arg.');
      });

      it('for unsupported char key', () => {
        assertErrorExpected('a', 'Unmapped or unsupported character to map: a');
      });

    });

  });

  describe('isStandardName should return', () => {

    describe('false', () => {

      it('for undefined arg', () => {
        expect(isStandardName(undefined)).toBeFalsy();
      });

      it('for empty arg', () => {
        expect(isStandardName('')).toBeFalsy();
      });

      it('for non-standard name arg', () => {
        expect(isStandardName('Mizar')).toBeFalsy();
      });

    });

    it('true for standard name arg', () => {
      expect(isStandardName('Alp UMa')).toBeTruthy();
    });

  });

  describe('extractStandardName should return', () => {

    describe('undefined', () => {

      it('if arg is undefined', () => {
        expect(extractStandardName(undefined)).toBeUndefined();
      });

      it('if arg does not contain names', () => {
        const rawStar = [0.33, -50.34, 5.5];
        expect(extractStandardName(rawStar)).toBeUndefined();
      });

      it('if arg contains proper name only', () => {
        const rawStar = [1.99, -59.99, 5.7, 'test'];
        expect(extractStandardName(rawStar)).toBeUndefined();
      });

    });

    describe('expected standard name', () => {

      it('if only standard name is present', () => {
        const rawStar = [0.27, -48.81, 5.7, 'TAU PHE'];
        expect(extractStandardName(rawStar)).toBe('TAU PHE');
      });

      it('if both standard and proper names are present', () => {
        const rawStar = [0.27, -48.81, 5.7, 'test', 'TAU PHE'];
        expect(extractStandardName(rawStar)).toBe('TAU PHE');
      });

    });

  });

  describe('extractProperName should return', () => {

    describe('undefined', () => {

      it('undefined if arg is undefined', () => {
        expect(extractProperName(undefined)).toBeUndefined();
      });

      it('undefined if arg does not contain names', () => {
        const rawStar = [0.33, -50.34, 5.5];
        expect(extractProperName(rawStar)).toBeUndefined();
      });

      it('undefined if arg contains standard name only', () => {
        const rawStar = [0.27, -48.81, 5.7, 'TAU PHE'];
        expect(extractProperName(rawStar)).toBeUndefined();
      });

    });

    describe('expected proper name', () => {

      it('if only proper name is present', () => {
        const rawStar = [1.99, -59.99, 5.7, 'test'];
        expect(extractProperName(rawStar)).toBe('test');
      });

      it('if both proper and standard names are present', () => {
        const rawStar = [1.99, -59.99, 5.7, 'test', 'TAU ZXE'];
        expect(extractProperName(rawStar)).toBe('test');
      });

    });

  });

});
