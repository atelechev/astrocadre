import { TestBed } from '@angular/core/testing';
import { ViewportEventService } from '../core/viewport/viewport-event.service';
import { GoToComponent } from './go-to.component';
import { SearchService } from '../core/search/search.service';
import { StaticDataService } from '../core/static-data-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SearchableItem } from '../core/search/searchable-item';
import { SkyCoordinate } from '../core/viewport/sky-coordinate';

class MockStaticData {

  public getSearchableItems(): Observable<SearchableItem[]> {
    const data = [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: [ 'Andromeda', 'other name']}
    ];
    return Observable.of(data);
  }

}

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
      ] });
    component = TestBed.get(GoToComponent);
    viewportEventService = TestBed.get(ViewportEventService);
  });

  it('#goToButtonDisabled should be initialized in disabled state', () => {
    expect(component.goToButtonDisabled).toBeTruthy();
  });

  it('#updateGoToButtonState should set goToButtonDisabled to false if search text is defined and not empty', () => {
    expect(component.goToButtonDisabled).toBeTruthy();
    component.searchText = 'test';
    component.updateGoToButtonState();
    expect(component.goToButtonDisabled).toBeFalsy();
  });

  it('#updateGoToButtonState should reset searchNoResultsClass', () => {
    component.searchNoResultsClass = 'error';
    expect(component.goToButtonDisabled).toBeTruthy();
    component.searchText = 'test';
    component.updateGoToButtonState();
    expect(component.searchNoResultsClass).toBe('');
  });

  const errorOnUnexpectedSearchResults = (center: SkyCoordinate): void => {
    throw new Error(`Center view should not have been requested, but was for ra=${center.rightAscension} dec=${center.declination}`);
  };

  it('#execGoToSearchRequest should not execute search request if search text is not defined', () => {
    component.goToButtonDisabled = false;
    component.searchText = undefined;
    viewportEventService.requestCenterView$.subscribe(
      (center) => errorOnUnexpectedSearchResults(center)
    );
    component.execGoToSearchRequest();
  });

  it('#execGoToSearchRequest should execute search request and trigger expected center view event', () => {
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

  it('#execGoToSearchRequest should set searchNoResultsClass to expected value if there were no search results', () => {
    component.goToButtonDisabled = false;
    component.searchText = 'test';
    viewportEventService.requestCenterView$.subscribe(
      (center) => errorOnUnexpectedSearchResults(center)
    );
    component.execGoToSearchRequest();
    expect(component.searchNoResultsClass).toBe('searchtext-input-invalid');
  });

});
