import { BehaviorSubject } from 'rxjs';
import { Searchable } from '#core/models/layers/searchable';
import { SkyCoordinate } from '#core/models/screen/sky-coordinate';
import { SearchService } from '#core/services/search.service';

const searchableData: Array<Searchable> = [
  { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'other name'] }
];

describe('SearchService', () => {

  let service: SearchService;

  beforeEach(() => service = new SearchService());

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

    beforeEach(() => service.registerSearchables(searchableData));

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
    service.registerSearchables(searchableData);
    // since there is only one entry in the mocked random data, it is the only entry that can be randomized :)
    expect(service.getRandomLocationName()).toEqual('Andromeda');
  });

  describe('searchablesCount should return', () => {

    it('0 when there are no searchables registered', () => {
      expect(service.searchablesCount).toEqual(0);
    });

    it('the expected number of registered items', () => {
      service.registerSearchables(searchableData);
      expect(service.searchablesCount).toEqual(3);
    });

  });

  describe('registerSearchables should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.searchablesCount).toEqual(0);
      service.registerSearchables(undefined);
      expect(service.searchablesCount).toEqual(0);
    });

    it('have no effect if the searchable object is falsy', () => {
      expect(service.searchablesCount).toEqual(0);
      service.registerSearchables([undefined]);
      expect(service.searchablesCount).toEqual(0);
    });

    it('register the expected searchable object by code', () => {
      const searchable = {
        type: 'constellation',
        code: 'AND',
        ra: 8.532,
        dec: 38.906
      };
      expect(service.searchablesCount).toEqual(0);
      service.registerSearchables([searchable]);
      expect(service.searchablesCount).toEqual(1);
    });

    it('register the expected searchable object by name', () => {
      const searchable = {
        type: 'constellation',
        code: 'AND',
        ra: 8.532,
        dec: 38.906,
        names: ['Andromeda']
      };
      expect(service.searchablesCount).toEqual(0);
      service.registerSearchables([searchable]);
      expect(service.searchablesCount).toEqual(2);
    });

    it('emit a search ready event if the number of calls achieves the expected number', () => {
      const eventHandler = service.searchReady as BehaviorSubject<boolean>;
      spyOn(eventHandler, 'next');

      const eventsUntilReady = 9;
      for (let i = eventsUntilReady; i > 0; i--) {
        const searchable = {
          type: 'object',
          code: `CODE${i}`,
          ra: i,
          dec: i,
          names: []
        };
        service.registerSearchables([searchable]);
        expect(eventHandler.next).toHaveBeenCalledTimes(0);
      }

      service.registerSearchables(searchableData);
      expect(eventHandler.next).toHaveBeenCalledTimes(1);
    });

  });

});
