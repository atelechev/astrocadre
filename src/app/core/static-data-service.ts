import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ThemeDefinition } from './theme/theme-definition';
import { Layers } from './layers';
import { ConstellationMetadata } from './layer/constellation-metadata';
import { SectionMetadata } from './controls/section-metadata';
import { SearchableItem } from './search/searchable-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Provides access to all static server side resources.
 */
@Injectable()
export class StaticDataService {

  constructor(private httpClient: HttpClient) {

  }

  private getPathToJson(subPath: string, resourceName: string): string {
    if (subPath) {
      return `/assets/${subPath}/${resourceName}.json`;
    }
    return `/assets/${resourceName}.json`;
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
    return this.getSearchableItems().map(
      (searchables: SearchableItem[]) => {
        return searchables.filter(
          item => item.type === 'constellation'
        ).map(
          (item: SearchableItem) =>
            new ConstellationMetadata(item.code, item.ra, item.dec, item.names)
        );
      }
    );
  }

  public getAvailableThemes(): Observable<SectionMetadata> {
    const url = this.getPathToJson('themes', 'themes');
    return this.execGetRequestForUrl(url);
  }

  public getAvailableLayers(): Observable<SectionMetadata> {
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
      return Observable.throw(res);
    }
    if (res.error) {
      return Observable.throw(res.error);
    }
    return Observable.throw('Failed to retrieve data JSON from server.');
  }

  private execGetRequestForUrl(url: string): Observable<any> {
    return this.httpClient.get(url)
                    .map((res: Response) => res.json ? res.json() : res)
                    .catch(this.handleError);
  }

}
