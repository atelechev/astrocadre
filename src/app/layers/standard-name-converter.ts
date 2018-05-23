
export class StandardNameConverter {

  private static CHAR_MAPPINGS: Map<string, string> = StandardNameConverter.initCharMappings();

  private static initCharMappings(): Map<string, string> {
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
    charsMap.set('mu',  'μ');
    charsMap.set('nu',  'ν');
    charsMap.set('xi',  'ξ');
    charsMap.set('omi', 'ο');
    charsMap.set('pi',  'π');
    charsMap.set('rho', 'ρ');
    charsMap.set('sig', 'σ');
    charsMap.set('tau', 'τ');
    charsMap.set('ups', 'υ');
    charsMap.set('phi', 'φ');
    charsMap.set('chi', 'χ');
    charsMap.set('psi', 'ψ');
    charsMap.set('ome', 'ω');
    return charsMap;
  }

  public static toGreekLetter(stdName: string): string {
    if (!stdName) {
      throw new Error('Undefined stdName arg.');
    }
    const greekLetterPartEnd = stdName.indexOf(' ');
    const greekKey = (greekLetterPartEnd > -1 ? stdName.substring(0, greekLetterPartEnd) : stdName).toLowerCase();
    if (!StandardNameConverter.CHAR_MAPPINGS.has(greekKey)) {
      throw new Error('Unmapped or unsupported character to map: ' + greekKey);
    }
    return StandardNameConverter.CHAR_MAPPINGS.get(greekKey);
  }

  public static isStandardName(name: string): boolean {
    if (!name || name.length === 0) {
      return false;
    }
    try {
      StandardNameConverter.toGreekLetter(name);
      return true;
    } catch (ex) {
      return false;
    }
  }

}
