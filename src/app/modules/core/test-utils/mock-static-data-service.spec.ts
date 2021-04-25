import { Observable, of } from 'rxjs';
import { Layer } from '#core/models/layers/layer';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { Theme } from '#core/models/theme/theme';
import { ThemeMeta } from '#core/models/theme/theme-meta';
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
      case SupportedLayers.CONSTELLATIONS:
        return of([{
          boundaries: [[177.5, -24.5, 162.5, -24.5]],
          lines: [[72.46, 6.95, 72.65, 8.9]],
          names: [{ type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda'] }]
        }]);
      case 'stars-mag2.0':
        return of([[37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']]);
      default:
        return of([]);
    }
  }

}
