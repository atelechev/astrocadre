import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { SkyCoordinate } from 'src/app/modules2/core/models/sky-coordinate';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';

@Injectable()
export class SearchService {

  private readonly _coordinatesPattern = /(\d+(?:[.,]\d*)?)\s+(-?\d+(?:[.,]\d*)?)/i; // two decimal numbers separated with spaces

  private _searchables: Map<string, Searchable>;

  private readonly _searchReady: BehaviorSubject<boolean>;

  constructor(private readonly _dataService: StaticDataService) {
    this._searchables = new Map<string, Searchable>();
    this._searchReady = new BehaviorSubject<boolean>(false);
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
    const maybeCoordinates = this.parseAsCoordinates(query);
    if (maybeCoordinates) {
      return maybeCoordinates;
    }
    const searchTextNormalized = this.normalizeSearchString(query);
    if (this._searchables.has(searchTextNormalized)) {
      const item = this._searchables.get(searchTextNormalized);
      return this.toSkyCoordinate(item.ra, item.dec);
    }
    return undefined;
  }

  public getRandomLocationName(): string {
    const allSearchableQueries = Array.from(this._searchables.keys());
    const randomQuery = allSearchableQueries[Math.floor(Math.random() * allSearchableQueries.length)];
    const location = this._searchables.get(randomQuery);
    return location.names?.length > 0 ? location.names[0] : location.code;
  }

  public searchReady(): Observable<boolean> {
    return this._searchReady;
  }

  public registerSearchables(items: Array<Searchable>): void {
    if (!items) {
      return;
    }
    items.forEach(
      (item: Searchable) => this.registerSearchable(item)
    );
  }

  private parseAsCoordinates(query: string): SkyCoordinate {
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
    // TODO should not be loaded here, but registered by the respective layers.
    this._dataService
      .getDataJson('searchable-items') // TODO fetch them inside the respective stars layers.
      .toPromise()
      .then(
        (items: Array<Searchable>) => {
          this.registerSearchables(items);
          this._searchReady.next(true);
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
