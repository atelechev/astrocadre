import { StarNameExtractor } from './star-name-extractor';

describe('StarNameExtractor', () => {

  const extractor = StarNameExtractor;

  it('#extractStandardName should return undefined if arg is undefined', () => {
    expect(extractor.extractStandardName(undefined)).toBeUndefined();
  });

  it('#extractStandardName should return undefined if arg does not contain names', () => {
    const rawStar = [ 0.33, -50.34, 5.5 ];
    expect(extractor.extractStandardName(rawStar)).toBeUndefined();
  });

  it('#extractStandardName should return undefined if arg contains proper name only', () => {
    const rawStar = [ 1.99, -59.99, 5.7, 'test' ];
    expect(extractor.extractStandardName(rawStar)).toBeUndefined();
  });

  it('#extractStandardName should return expected standard name if only standard name is present', () => {
    const rawStar = [ 0.27, -48.81, 5.7, 'TAU PHE' ];
    expect(extractor.extractStandardName(rawStar)).toBe('TAU PHE');
  });

  it('#extractStandardName should return expected standard name if both standard and proper names are present', () => {
    const rawStar = [ 0.27, -48.81, 5.7, 'test', 'TAU PHE' ];
    expect(extractor.extractStandardName(rawStar)).toBe('TAU PHE');
  });

  it('#extractProperName should return undefined if arg is undefined', () => {
    expect(extractor.extractProperName(undefined)).toBeUndefined();
  });

  it('#extractProperName should return undefined if arg does not contain names', () => {
    const rawStar = [ 0.33, -50.34, 5.5 ];
    expect(extractor.extractProperName(rawStar)).toBeUndefined();
  });

  it('#extractProperName should return undefined if arg contains standard name only', () => {
    const rawStar = [ 0.27, -48.81, 5.7, 'TAU PHE' ];
    expect(extractor.extractProperName(rawStar)).toBeUndefined();
  });

  it('#extractProperName should return expected proper name if only proper name is present', () => {
    const rawStar = [ 1.99, -59.99, 5.7, 'test' ];
    expect(extractor.extractProperName(rawStar)).toBe('test');
  });

  it('#extractProperName should return expected proper name if both proper and standard names are present', () => {
    const rawStar = [ 1.99, -59.99, 5.7, 'test', 'TAU ZXE' ];
    expect(extractor.extractProperName(rawStar)).toBe('test');
  });

});
