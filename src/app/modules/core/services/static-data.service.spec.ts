import { of } from 'rxjs';
import { Layer } from '#core/models/layer';
import { Theme } from '#core/models/theme';
import { ThemeMeta } from '#core/models/theme-meta';
import { StaticDataService } from '#core/services/static-data.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { mockedLines } from '#core/test-utils/mocked-lines.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';


describe('StaticDataService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let service: StaticDataService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StaticDataService(httpClientSpy as any);
  });

  it('getThemes should return expected data', () => {
    httpClientSpy.get.and.returnValue(of(mockedThemes));
    service.getThemes()
      .subscribe(
        (themes: Array<ThemeMeta>) => expect(themes).toEqual(mockedThemes)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getTheme should return expected data', () => {
    httpClientSpy.get.and.returnValue(of(mockedTheme));
    service.getTheme('dev')
      .subscribe(
        (theme: Theme) => expect(theme).toEqual(mockedTheme)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getLayersTree should return expected data', () => {
    httpClientSpy.get.and.returnValue(of(mockedLayers));
    service.getLayersTree()
      .subscribe(
        (layer: Layer) => expect(layer).toEqual(mockedLayers)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getDataJson should return expected data', () => {
    httpClientSpy.get.and.returnValue(of(mockedLines));
    service.getDataJson('mocked-lines')
      .subscribe(
        (lines: Array<any>) => expect(lines).toEqual(mockedLines)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});