import { Injectable } from '@angular/core';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { SkyCoordinate } from 'src/app/modules2/core/models/sky-coordinate';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';

@Injectable()
export class SearchService {

  private readonly _coordinatesPattern = /(\d+(?:[.,]\d*)?)\s+(-?\d+(?:[.,]\d*)?)/i;

  private _searchables: Map<string, Searchable>;

  constructor(private readonly _dataService: StaticDataService) {
    this._searchables = new Map<string, Searchable>();
    this.loadSearchables();
  }

  /**
   * Returns the SkyCoordinate that corresponds to the specified search query.
   *
   * @param query the query string
   */
  public search(query: string): SkyCoordinate {
    if (!query || query.trim().length === 0) {
      return undefined;
    }
    const directCoordinates = this.directParseToCoordinate(query);
    if (directCoordinates) {
      return directCoordinates;
    }
    const searchTextNormalized = this.normalizeSearchString(query);
    if (this._searchables.has(searchTextNormalized)) {
      const item = this._searchables.get(searchTextNormalized);
      return this.toSkyCoordinate(item.ra, item.dec);
    }
    return undefined;
  }

  private directParseToCoordinate(query: string): SkyCoordinate {
    const matches = query.match(this._coordinatesPattern);
    if (matches && matches.length === 3) {
      return this.toSkyCoordinate(parseFloat(matches[1]), parseFloat(matches[2]));
    }
    return undefined;
  }

  private toSkyCoordinate(ra: number, dec: number): SkyCoordinate {
    return { rightAscension: ra, declination: dec };
  }

  private normalizeSearchString(value: string): string {
    const replaceExpr = /\s+/gi;
    return value.replace(replaceExpr, '').toUpperCase();
  }

  private loadSearchables(): void {
    this._dataService
      .getDataJson('searchable-items')
      .subscribe(
        (items: Array<Searchable>) => {
          items?.forEach(
            (item: Searchable) => this.registerSearchable(item)
          );
        }
      );
  }

  private registerSearchable(searchable: Searchable): void {
    if (!searchable) {
      return;
    }
    this._searchables.set(this.normalizeSearchString(searchable.code), searchable);
    searchable.names?.forEach(
      (name: string) => this._searchables.set(this.normalizeSearchString(name), searchable)
    );
  }

}
