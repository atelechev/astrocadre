import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Layer } from '#core/models/layers/layer';
import { Theme } from '#core/models/theme/theme';
import { ThemeMeta } from '#core/models/theme/theme-meta';
import { environment } from '#environments/environment';

/**
 * Provides methods to access the static data from the back-end.
 */
@Injectable()
export class StaticDataService {

  constructor(private readonly _httpClient: HttpClient) {

  }

  /**
   * Returns the array of all available themes metadata.
   *
   * @returns Array<ThemeMeta> available themes metadata.
   */
  public getThemes(): Observable<Array<ThemeMeta>> {
    const url = this.getPathToJson('themes', 'themes');
    return this._httpClient.get<Array<ThemeMeta>>(url);
  }

  /**
   * Returns the specified theme.
   *
   * @param code the code of the theme to retrieve.
   * @returns Observable<Theme> the theme.
   */
  public getTheme(code: string): Observable<Theme> {
    const url = this.getPathToJson('themes', code);
    return this._httpClient.get<Theme>(url);
  }

  /**
   * Returns the tree containing the models of all available layers.
   *
   * The models are fetched without the objects definitions, which should be retrieved separately.
   *
   * @returns Observable<Layer> the root reference of the layer model tree.
   */
  public getLayersTree(): Observable<Layer> {
    const url = this.getPathToJson(undefined, 'layers');
    return this._httpClient.get<Layer>(url);
  }

  /**
   * Returns a JSON expected to contain the objects data of the layers.
   *
   * @param resource the name of the objects to retrieve. Should be a code of a layer.
   * @returns Array<any> array of layer data objects.
   */
  public getDataJson(resource: string): Observable<Array<any>> {
    const url = this.getPathToJson(undefined, resource);
    return this._httpClient.get<any>(url);
  }

  private getPathToJson(subPath: string, resourceName: string): string {
    const infix = subPath ? `${subPath}/` : '';
    const url = `/assets/${infix}${resourceName}.json`;
    return environment.pathInContext(url);
  }

}