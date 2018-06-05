import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SearchableItem } from './searchable-item';
import { SearchService } from './search.service';
import { StaticDataService } from '../static-data-service';
import { SkyCoordinate } from '../viewport/sky-coordinate';

class MockStaticData {

  public getSearchableItems(): Observable<SearchableItem[]> {
    const data = [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: [ 'Andromeda', 'other name']}
    ];
    return Observable.of(data);
  }

}

describe('SearchService', () => {

  let service: SearchService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
        { provide: StaticDataService, useClass: MockStaticData }
      ] });
    service = TestBed.get(SearchService);
  });

  const coords = (ra: number, dec: number): SkyCoordinate => {
    return {
      rightAscension: ra,
      declination: dec
    };
  };

  const assertCoordsExpected = (checked: SkyCoordinate, expected: SkyCoordinate): void => {
    expect(checked).toBeDefined();
    expect(checked.rightAscension).toBe(expected.rightAscension);
    expect(checked.declination).toBe(expected.declination);
  };

  it('#search should return undefined if query arg is undefined', () => {
    expect(service.search(undefined)).toBeUndefined();
  });

  it('#search should return undefined if nothing matches the query', () => {
    expect(service.search('test')).toBeUndefined();
  });

  it('#search should return coordinates directly if query contained coordinates', () => {
    const expected = coords(15.5, -25.1);
    const found = service.search('15.5 -25.1');
    assertCoordsExpected(found, expected);
  });

  it('#search should return expected coordinate if query matches constellation code', () => {
    const expected = coords(8.532, 38.906);
    const found = service.search('and');
    assertCoordsExpected(found, expected);
  });

  it('#search should return expected coordinate if query matches constellation code', () => {
    const expected = coords(8.532, 38.906);
    const found = service.search('and');
    assertCoordsExpected(found, expected);
  });

  it('#search should return expected coordinate if query matches constellation name', () => {
    const expected = coords(8.532, 38.906);
    const found = service.search('ANDROMEDA');
    assertCoordsExpected(found, expected);
  });

  it('#search should return expected coordinate if query matches constellation name, ignoring whitespaces', () => {
    const expected = coords(8.532, 38.906);
    const found = service.search('other    name');
    assertCoordsExpected(found, expected);
  });

});