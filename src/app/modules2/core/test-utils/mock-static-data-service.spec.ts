import { Observable, of } from 'rxjs';
import { Layer } from 'src/app/modules2/core/models/layer';
import { Theme } from 'src/app/modules2/core/models/theme';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { mockedLayers } from 'src/app/modules2/core/test-utils/mocked-layers.spec';
import { mockedTheme } from 'src/app/modules2/core/test-utils/mocked-theme.spec';
import { mockedThemes } from 'src/app/modules2/core/test-utils/mocked-themes.spec';

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
    if (resource === 'stars-mag2.0') {
      return of([[37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']]);
    }
    return of([]);
  }

}