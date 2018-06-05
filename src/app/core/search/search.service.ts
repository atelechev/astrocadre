import { Injectable } from '@angular/core';
import { StaticDataService } from '../static-data-service';
import { SearchableItem } from './searchable-item';
import { ensureArgDefined } from '../layer/arg-validation-utils';
import { SkyCoordinate } from '../viewport/sky-coordinate';

@Injectable()
export class SearchService {

  private readonly coordinatesPattern = /(\d+(?:[.,]\d*)?)\s+(-?\d+(?:[.,]\d*)?)/i;

  private searchableItems: Map<string, SearchableItem>;

  constructor(private dataService: StaticDataService) {
    this.initSearchableItems();
  }

  private normalizeSearchString(value: string): string {
    const replaceExpr = /\s+/gi;
    return value.replace(replaceExpr, '').toUpperCase();
  }

  private initSearchableItems(): void {
    this.searchableItems = new Map<string, SearchableItem>();
    this.dataService.getSearchableItems().subscribe(
      (items: SearchableItem[]) => {
          items.forEach(item => {
              this.searchableItems.set(this.normalizeSearchString(item.code), item);
              if (item.names) {
                item.names.forEach(name => this.searchableItems.set(this.normalizeSearchString(name), item));
              }
            }
          );
        },
      (error: any) => console.log(`Failed to retrieve searchable items: ${error}`)
    );
  }

  private toSkyCoordinate(ra: number, dec: number): SkyCoordinate {
    return { rightAscension: ra, declination: dec };
  }

  /**
   * Returns the SkyCoordinate that corresponds to the specified search query.
   *
   * @param query the query string
   */
  public search(query: string): SkyCoordinate {
    if (!query) {
      return undefined;
    }
    const directCoordinates = this.attemptDirectParseToCoordinate(query);
    if (directCoordinates) {
      return directCoordinates;
    }
    const searchTextNormalized = this.normalizeSearchString(query);
    if (this.searchableItems.has(searchTextNormalized)) {
      const item = this.searchableItems.get(searchTextNormalized);
      return this.toSkyCoordinate(item.ra, item.dec);
    }
    return undefined;
  }

  private attemptDirectParseToCoordinate(query: string): SkyCoordinate {
    const matches = query.match(this.coordinatesPattern);
    if (matches && matches.length === 3) {
      return this.toSkyCoordinate(parseFloat(matches[1]), parseFloat(matches[2]));
    }
    return undefined;
  }

}