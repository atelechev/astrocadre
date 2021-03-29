import { Searchable } from 'src/app/modules/core/models/searchable';
import { SkyCoordinate } from 'src/app/modules/core/models/sky-coordinate';
import { SearchService } from 'src/app/modules/core/services/search.service';

const searchableData: Array<Searchable> = [
  { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'other name'] }
];

describe('SearchService', () => {

  let service: SearchService;

  beforeEach(() => {
    service = new SearchService();
    service.registerSearchables(searchableData);
  });

  const coords = (ra: number, dec: number): SkyCoordinate => ({
    rightAscension: ra,
    declination: dec
  });

  const assertCoordsExpected = (checked: SkyCoordinate, expected: SkyCoordinate): void => {
    expect(checked).toBeDefined();
    expect(checked.rightAscension).toBe(expected.rightAscension);
    expect(checked.declination).toBe(expected.declination);
  };

  describe('search should return', () => {

    describe('undefined', () => {

      it('if query arg is undefined', () => {
        expect(service.search(undefined)).toBeUndefined();
      });

      it('if query arg is empty', () => {
        expect(service.search('   ')).toBeUndefined();
      });

      it('if nothing matches the query', () => {
        expect(service.search('test')).toBeUndefined();
      });

    });

    describe('expected coordinate', () => {

      it('directly if query contained coordinates', () => {
        const expected = coords(15.5, -25.1);
        const found = service.search('15.5 -25.1');
        assertCoordsExpected(found, expected);
      });

      it('if query matches constellation code', () => {
        const expected = coords(8.532, 38.906);
        const found = service.search('and');
        assertCoordsExpected(found, expected);
      });

      it('if query matches constellation code', () => {
        const expected = coords(8.532, 38.906);
        const found = service.search('and');
        assertCoordsExpected(found, expected);
      });

      it('if query matches constellation name', () => {
        const expected = coords(8.532, 38.906);
        const found = service.search('ANDROMEDA');
        assertCoordsExpected(found, expected);
      });

      it('if query matches constellation name, ignoring whitespaces', () => {
        const expected = coords(8.532, 38.906);
        const found = service.search('other    name');
        assertCoordsExpected(found, expected);
      });

    });

  });

  it('getRandomLocationName should return expected data', () => {
    // since there is only one entry in the mocked random data, it is the only entry that can be randomized :)
    expect(service.getRandomLocationName()).toEqual('Andromeda');
  });

});
