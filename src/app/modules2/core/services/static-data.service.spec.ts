import { Layer } from 'src/app/modules2/core/models/layer';
import { Theme } from 'src/app/modules2/core/models/theme';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { mockedLayers } from 'src/app/modules2/core/test-utils/mocked-layers.spec';
import { mockedLines } from 'src/app/modules2/core/test-utils/mocked-lines.spec';
import { mockedTheme } from 'src/app/modules2/core/test-utils/mocked-theme.spec';
import { mockedThemes } from 'src/app/modules2/core/test-utils/mocked-themes.spec';
import { asyncData } from '#core/models/abstract-factories.spec';


describe('StaticDataService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let service: StaticDataService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StaticDataService(httpClientSpy as any);
  });

  it('getThemes should return expected data', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockedThemes));
    service.getThemes()
      .subscribe(
        (themes: Array<ThemeMeta>) => expect(themes).toEqual(mockedThemes)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getTheme should return expected data', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockedTheme));
    service.getTheme('dev')
      .subscribe(
        (theme: Theme) => expect(theme).toEqual(mockedTheme)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getLayersTree should return expected data', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockedLayers));
    service.getLayersTree()
      .subscribe(
        (layer: Layer) => expect(layer).toEqual(mockedLayers)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('getDataJson should return expected data', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockedLines));
    service.getDataJson('mocked-lines')
      .subscribe(
        (lines: Array<any>) => expect(lines).toEqual(mockedLines)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});
