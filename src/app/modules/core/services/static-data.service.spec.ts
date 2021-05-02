import { of } from 'rxjs';
import { Theme } from '#core/models/theme/theme';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { StaticDataService } from '#core/services/static-data.service';
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

  it('getDataJson should return expected data', () => {
    const rawLines = [
      [72.46, 6.95, 72.65, 8.9],
      [72.8, 5.6, 72.46, 6.95],
      [73.56, 2.45, 72.8, 5.6],
      [74.64, 1.72, 73.56, 2.45],
      [81.28, 6.35, 74.64, 1.72],
      [83.0, -0.3, 81.28, 6.35]
    ];
    httpClientSpy.get.and.returnValue(of(rawLines));
    service.getDataJson('mocked-lines')
      .subscribe(
        (lines: Array<any>) => expect(lines).toEqual(lines)
      );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

});
