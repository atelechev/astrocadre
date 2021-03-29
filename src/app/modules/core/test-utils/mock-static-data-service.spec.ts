import { Observable, of } from 'rxjs';
import { Layer } from '#core/models/layer';
import { SupportedLayers } from '#core/models/supported-layers';
import { Theme } from '#core/models/theme';
import { ThemeMeta } from '#core/models/theme-meta';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { mockedThemes } from '#core/test-utils/mocked-themes.spec';

export class MockStaticDataService {

  public getTheme(_: string): Observable<Theme> {
    return of(mockedTheme);
  }

  public getThemes(): Observable<Array<ThemeMeta>> {
    return of(mockedThemes);
  }

  public getLayersTree(): Observable<Layer> {
    return of(mockedLayers);
  }

  public getDataJson(resource: string): Observable<Array<any>> {
    switch (resource) {
      case SupportedLayers.CONSTELLATION_NAMES:
        return of([{ type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'Andromeda'] }]);
      case 'stars-mag2.0':
        return of([[37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']]);
      default:
        return of([]);
    }
  }

}
