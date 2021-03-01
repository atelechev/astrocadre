import { TestBed } from '@angular/core/testing';
import { Observable, of as observableOf } from 'rxjs';
import { StaticDataService } from '#core/static-data.service';
import { SkyCoordinate } from '#core/viewport/sky-coordinate';
import { SearchService } from '#core-search/search.service';


import { SearchableItem } from '#core-search/searchable-item';

class MockStaticData {

  public getSearchableItems(): Observable<SearchableItem[]> {
    const data = [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'other name'] }
    ];
    return observableOf(data);
  }

}

describe('SearchService', () => {

  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: StaticDataService, useClass: MockStaticData }
      ]
    });
    service = TestBed.inject(SearchService);
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

});
