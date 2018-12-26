import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ThemeDefinition } from './theme/theme-definition';
import { Layers } from './layers';
import { ConstellationMetadata } from './layer/constellation-metadata';
import { SearchableItem } from './search/searchable-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from './tree-node';
import { environment } from '../../environments/environment';

/**
 * Provides access to all static server side resources.
 */
@Injectable()
export class StaticDataService {

  constructor(private httpClient: HttpClient) {

  }

  private getPathToJson(subPath: string, resourceName: string): string {
    const url = subPath ? `/assets/${subPath}/${resourceName}.json` :
                          `/assets/${resourceName}.json`;
    return environment.pathInContext(url);
  }

  public getThemeDefinition(theme: string): Observable<ThemeDefinition> {
    const url = this.getPathToJson('themes', theme);
    return this.execGetRequestForUrl(url);
  }

  public getConstellationBoundaries(): Observable<number[][]> {
    const url = this.getPathToJson('', Layers.CONSTELLATION_BOUNDARIES);
    return this.execGetRequestForUrl(url);
  }

  public getConstellationLines(): Observable<number[][]> {
    const url = this.getPathToJson('', Layers.CONSTELLATION_LINES);
    return this.execGetRequestForUrl(url);
  }

  public getStarsByMagnitudeClass(magnitudeClass: number): Observable<any[][]> {
    const url = this.getPathToJson('', `stars-mag${magnitudeClass.toFixed(1)}`);
    return this.execGetRequestForUrl(url);
  }

  public getConstellationsMetadata(): Observable<ConstellationMetadata[]> {
    return this.getSearchableItems().pipe(map(
      (searchables: SearchableItem[]) => {
        return searchables.filter(
          item => item.type === 'constellation'
        ).map(
          (item: SearchableItem) =>
            new ConstellationMetadata(item.code, item.ra, item.dec, item.names)
        );
      }
    ));
  }

  public getAvailableThemes(): Observable<TreeNode[]> {
    const url = this.getPathToJson('themes', 'themes');
    return this.execGetRequestForUrl(url);
  }

  public getAvailableLayers(): Observable<TreeNode> {
    const url = this.getPathToJson('', 'layers');
    return this.execGetRequestForUrl(url);
  }

  public getSearchableItems(): Observable<SearchableItem[]> {
    const url = this.getPathToJson('', 'searchable-items');
    return this.execGetRequestForUrl(url);
  }

  private handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return observableThrowError(res);
    }
    if (res.error) {
      return observableThrowError(res.error);
    }
    return observableThrowError('Failed to retrieve data JSON from server.');
  }

  private execGetRequestForUrl(url: string): Observable<any> {
    return this.httpClient.get(url).pipe(
                    map((res: Response) => res.json ? res.json() : res),
                    catchError(this.handleError));
  }

}
