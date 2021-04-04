import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoaderService } from '#core/services/data/loader.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { ThemeService } from '#core/services/theme.service';
import { StaticDataService } from '#core/services/data/static-data.service';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayerService } from '#core/services/layer.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { themeDefault } from '#core/models/theme/theme-default';


describe('LoaderService', () => {

  let service: LoaderService;
  let themeService: ThemeService;
  let layerService: LayerService;
  let dataService: StaticDataService;

  beforeEach(() => {
    const ctx = new TestContext()
      .withProviders([
        LoaderService
      ])
      .configure();
    service = ctx.getService(LoaderService);
    themeService = ctx.themeService;
    layerService = ctx.layerService;
    dataService = ctx.getService(StaticDataService);
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
      expect(layerService.registerLayer).toHaveBeenCalledTimes(10);
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
