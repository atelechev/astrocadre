import { fakeAsync, TestBed } from '@angular/core/testing';
import { GoToComponent } from 'src/app/modules2/controls/components/go-to/go-to.component';
import { SkyCoordinate } from 'src/app/modules2/core/models/sky-coordinate';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { SearchService } from 'src/app/modules2/core/services/search.service';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';

describe('GoToComponent', () => {

  let ctx: TestContext;
  let component: GoToComponent;
  let searchService: SearchService;
  const polarisCoords: SkyCoordinate = {
    rightAscension: 37.95,
    declination: 89.26
  };

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(GoToComponent)
      .configure();
    component = ctx.getComponent(GoToComponent);
    searchService = TestBed.inject(SearchService);
  }));

  describe('isDisabled should return', () => {

    describe('true', () => {

      it('if no search text is set', fakeAsync(() => {
        component.searchText = undefined;
        expect(component.isDisabled).toBeTrue();
      }));

      it('if the search text is empty', fakeAsync(() => {
        component.searchText = '   ';
        expect(component.isDisabled).toBeTrue();
      }));

    });

    it('false if the search text is defined', fakeAsync(() => {
      component.searchText = 'something';
      expect(component.isDisabled).toBeFalse();
    }));

  });

  describe('searchNoResultsCssClass', () => {

    it('should return expected class if there are no search results', fakeAsync(() => {
      component.searchText = 'abc';
      component.execSearchRequest();
      expect(component.searchNoResultsCssClass).toEqual('ng-invalid');
    }));

    it('should return an empty string if there are search results', fakeAsync(() => {
      spyOn(searchService, 'search').and.returnValue(polarisCoords);
      component.searchText = 'polaris';
      component.execSearchRequest();
      expect(component.searchNoResultsCssClass).toEqual('');
    }));

  });

  describe('execSearchRequest should', () => {

    it('execute a search request', fakeAsync(() => {
      spyOn(searchService, 'search');
      component.searchText = 'find me!';
      component.execSearchRequest();

      expect(searchService.search).toHaveBeenCalledTimes(1);
    }));

    it('center the view on the result if the search was successful', fakeAsync(() => {
      const cameraService = TestBed.inject(CameraService);
      spyOn(searchService, 'search').and.returnValue(polarisCoords);
      spyOn(cameraService, 'centerView');
      component.searchText = 'polaris';
      component.execSearchRequest();

      expect(cameraService.centerView).toHaveBeenCalledTimes(1);
    }));

  });

});
