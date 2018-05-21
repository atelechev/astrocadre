
export class StandardNameConverter {

  private static CHAR_MAPPINGS: Map<string, string> = StandardNameConverter.initCharMappings();

  private static initCharMappings(): Map<string, string> {
    const charsMap = new Map<string, string>();
    charsMap.set('alp', '&alpha;');
    charsMap.set('bet', '&beta;');
    charsMap.set('gam', '&gamma;');
    charsMap.set('del', '&delta;');
    charsMap.set('eps', '&epsilon;');
    charsMap.set('zet', '&zeta;');
    charsMap.set('eta', '&eta;');
    charsMap.set('the', '&theta;');
    charsMap.set('iot', '&iota;');
    charsMap.set('kap', '&kappa;');
    charsMap.set('lam', '&lambda;');
    charsMap.set('mu',  '&mu;');
    charsMap.set('nu',  '&nu;');
    charsMap.set('xi',  '&xi;');
    charsMap.set('omi', '&omicron;');
    charsMap.set('pi',  '&pi;');
    charsMap.set('rho', '&rho;');
    charsMap.set('sig', '&sigma;');
    charsMap.set('tau', '&tau;');
    charsMap.set('ups', '&upsilon;');
    charsMap.set('phi', '&phi;');
    charsMap.set('chi', '&chi;');
    charsMap.set('psi', '&psi;');
    charsMap.set('ome', '&omega;');
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
