import { TestBed } from '@angular/core/testing';
import { Observable, of as observableOf } from 'rxjs';
import { GoToComponent } from '#controls/components/go-to/go-to.component';
import { StaticDataService } from '#core/static-data.service';
import { SearchService } from '#core-search/search.service';
import { SearchableItem } from '#core-search/searchable-item';

import { ViewportEventService } from '#core-viewport/viewport-event.service';

import { SkyCoordinate } from '#core-viewport/sky-coordinate';

class MockStaticData {

  public getSearchableItems(): Observable<SearchableItem[]> {
    const data = [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'other name'] }
    ];
    return observableOf(data);
  }

}

const errorOnUnexpectedSearchResults = (center: SkyCoordinate): void => {
  throw new Error(`Center view should not have been requested, but was for ra=${center.rightAscension} dec=${center.declination}`);
};

describe('GoToComponent', () => {

  let component: GoToComponent;
  let viewportEventService: ViewportEventService;

  const precision = 3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoToComponent,
        ViewportEventService,
        SearchService,
        { provide: StaticDataService, useClass: MockStaticData }
      ]
    });
    component = TestBed.inject(GoToComponent);
    viewportEventService = TestBed.inject(ViewportEventService);
  });

  it('goToButtonDisabled should be initialized in disabled state', () => {
    expect(component.goToButtonDisabled).toBeTruthy();
  });

  describe('updateGoToButtonState should', () => {

    it('set goToButtonDisabled to false if search text is defined and not empty', () => {
      expect(component.goToButtonDisabled).toBeTruthy();
      component.searchText = 'test';
      component.updateGoToButtonState();
      expect(component.goToButtonDisabled).toBeFalsy();
    });

    it('reset searchNoResultsClass', () => {
      component.searchNoResultsClass = 'error';
      expect(component.goToButtonDisabled).toBeTruthy();
      component.searchText = 'test';
      component.updateGoToButtonState();
      expect(component.searchNoResultsClass).toBe('');
    });

  });

  describe('execGoToSearchRequest should', () => {

    it('not execute search request if search text is not defined', () => {
      component.goToButtonDisabled = false;
      component.searchText = undefined;
      viewportEventService.requestCenterView$.subscribe(
        (center) => errorOnUnexpectedSearchResults(center)
      );
      component.execGoToSearchRequest();
    });

    it('execute search request and trigger expected center view event', () => {
      component.goToButtonDisabled = false;
      component.searchText = 'and';
      viewportEventService.requestCenterView$.subscribe(
        (center) => {
          expect(center.rightAscension).toBeCloseTo(8.532, precision);
          expect(center.declination).toBeCloseTo(38.906, precision);
        }
      );
      component.execGoToSearchRequest();
    });

    it('set searchNoResultsClass to expected value if there were no search results', () => {
      component.goToButtonDisabled = false;
      component.searchText = 'test';
      viewportEventService.requestCenterView$.subscribe(
        (center) => errorOnUnexpectedSearchResults(center)
      );
      component.execGoToSearchRequest();
      expect(component.searchNoResultsClass).toBe('searchtext-input-invalid');
    });

  });

});
