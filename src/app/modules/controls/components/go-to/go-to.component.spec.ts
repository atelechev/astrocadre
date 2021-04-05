import { TestBed } from '@angular/core/testing';
import { SkyCoordinate } from '#core/models/screen/sky-coordinate';
import { CameraService } from '#core/services/camera.service';
import { SearchService } from '#core/services/search.service';
import { GoToComponent } from '#controls/components/go-to/go-to.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';

describe('GoToComponent', () => {

  let component: GoToComponent;
  let searchService: SearchService;
  const polarisCoords: SkyCoordinate = {
    rightAscension: 37.95,
    declination: 89.26
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    component = TestBed.createComponent(GoToComponent).componentInstance;
    searchService = TestBed.inject(SearchService);
  });

  describe('isDisabled should return', () => {

    describe('true', () => {

      it('if no search text is set', () => {
        component.searchText = undefined;
        expect(component.isDisabled).toBeTrue();
      });

      it('if the search text is empty', () => {
        component.searchText = '   ';
        expect(component.isDisabled).toBeTrue();
      });

    });

    it('false if the search text is defined', () => {
      component.searchText = 'something';
      expect(component.isDisabled).toBeFalse();
    });

  });

  describe('searchNoResultsCssClass', () => {

    it('should return expected class if there are no search results', () => {
      component.searchText = 'abc';
      component.execSearchRequest();
      expect(component.searchNoResultsCssClass).toEqual('ng-invalid');
    });

    it('should return an empty string if there are search results', () => {
      spyOn(searchService, 'search').and.returnValue(polarisCoords);
      component.searchText = 'polaris';
      component.execSearchRequest();
      expect(component.searchNoResultsCssClass).toEqual('');
    });

  });

  describe('execSearchRequest should', () => {

    it('execute a search request', () => {
      spyOn(searchService, 'search');
      component.searchText = 'find me!';
      component.execSearchRequest();

      expect(searchService.search).toHaveBeenCalledTimes(1);
    });

    it('center the view on the result if the search was successful', () => {
      const cameraService = TestBed.inject(CameraService);
      spyOn(searchService, 'search').and.returnValue(polarisCoords);
      spyOn(cameraService, 'centerView');
      component.searchText = 'polaris';
      component.execSearchRequest();

      expect(cameraService.centerView).toHaveBeenCalledTimes(1);
    });

  });

});
