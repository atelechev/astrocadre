import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { LoaderService } from '#controls/services/loader.service';
import { ThemeService } from '#core/services/theme.service';
import { StaticDataService } from '#core/services/static-data.service';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayerService } from '#core/services/layer.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { themeDefault } from '#core/models/theme/theme-default';
import { MockStaticDataService } from '#core/test-utils/mock-static-data-service.spec';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';


describe('LoaderService', () => {

  let service: LoaderService;
  let themeService: ThemeService;
  let layerService: LayerService;
  let dataService: StaticDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerSkyGridModule,
        LayerStarsModule,
        LayerConstellationsModule,
        LayerMessierModule
      ],
      providers: [
        {
          provide: StaticDataService,
          useClass: MockStaticDataService
        }
      ]
    });
    service = TestBed.inject(LoaderService);
    themeService = TestBed.inject(ThemeService);
    layerService = TestBed.inject(LayerService);
    dataService = TestBed.inject(StaticDataService);
  });

  describe('loadAllData should', () => {

    it('load expected themes metadata and trigger the loading of the first theme in the list', fakeAsync(() => {
      spyOn(dataService, 'getThemes').and.returnValue(of(mockedThemes));
      spyOn(dataService, 'getTheme').and.returnValue(of(mockedTheme));
      spyOn(service, 'loadTheme');

      expect(themeService.theme).toEqual(themeDefault);
      expect(themeService.availableThemes).toEqual([]);

      service.loadAllData();
      tick();

      expect(themeService.availableThemes).toEqual(mockedThemes);
      expect(service.loadTheme).toHaveBeenCalledWith('dev');
    }));

    it('load expected layers', fakeAsync(() => {
      spyOn(dataService, 'getLayersTree').and.returnValue(of(mockedLayers));
      spyOn(layerService, 'registerLayer');

      expect(layerService.rootLayer).toBeUndefined();

      service.loadAllData();
      tick();

      expect(layerService.rootLayer).toEqual(mockedLayers);
      expect(layerService.registerLayer).toHaveBeenCalledTimes(11);
    }));

  });

  describe('loadTheme should', () => {

    it('load the expected theme', fakeAsync(() => {
      spyOn(dataService, 'getTheme').and.returnValue(of(mockedTheme));

      expect(themeService.theme).toEqual(themeDefault);

      service.loadTheme(mockedTheme.code);
      tick();

      expect(themeService.theme).toEqual(mockedTheme);
    }));

    it('have not effect if the arg is falsy', fakeAsync(() => {
      spyOn(dataService, 'getTheme');

      expect(themeService.theme).toEqual(themeDefault);

      service.loadTheme(undefined);
      tick();

      expect(themeService.theme).toEqual(themeDefault);
      expect(dataService.getTheme).toHaveBeenCalledTimes(0);
    }));

    it('use the cached theme if it was already loaded', fakeAsync(() => {
      spyOn(dataService, 'getTheme').and.returnValues(of(mockedTheme), of(themeDefault));
      expect(themeService.theme).toEqual(themeDefault);

      service.loadTheme(mockedTheme.code);
      tick();

      expect(themeService.theme).toEqual(mockedTheme);
      expect(dataService.getTheme).toHaveBeenCalledTimes(1);

      service.loadTheme(themeDefault.code);
      tick();
      expect(themeService.theme).toEqual(themeDefault);
      expect(dataService.getTheme).toHaveBeenCalledTimes(2);

      service.loadTheme(mockedTheme.code);
      tick();

      expect(themeService.theme).toEqual(mockedTheme);
      expect(dataService.getTheme).toHaveBeenCalledTimes(2);
    }));

    it('log expected error if the theme was not found', fakeAsync(() => {
      spyOn(dataService, 'getTheme').and.returnValue(throwError('404 Not Found'));
      spyOn(console, 'error');
      spyOnProperty(themeService, 'theme');

      service.loadTheme('unknown');
      tick();

      expect(console.error).toHaveBeenCalledTimes(1);
    }));

  });

});
