import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Searchable } from '#core/models/searchable';
import { SkyCoordinate } from '#core/models/sky-coordinate';

@Injectable()
export class SearchService {

  private readonly _starStandardNamePattern = /[A-Z]+\s+[A-Z]+/;

  private readonly _coordinatesPattern = /(\d+(?:[.,]\d*)?)\s+(-?\d+(?:[.,]\d*)?)/i; // two decimal numbers separated with spaces

  private _searchables: Map<string, Searchable>;

  private readonly _expectedLayersWithSearchables: number;

  private _registeredLayersWithSearchables: number;

  private readonly _searchReady: BehaviorSubject<boolean>;

  constructor() {
    this._expectedLayersWithSearchables = 10;
    this._registeredLayersWithSearchables = 0;
    this._searchables = new Map<string, Searchable>();
    this._searchReady = new BehaviorSubject<boolean>(false);
  }

  public get searchablesCount(): number {
    return this._searchables.size;
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
    // avoid showing to standard star names queries, they are ugly
    const matchedStandardName = location.code.match(this._starStandardNamePattern);
    if (matchedStandardName) {
      return this.getRandomLocationName();
    }
    return location.names?.length > 0 ? location.names[0] : location.code;
  }

  public searchReady(): Observable<boolean> {
    return this._searchReady;
  }

  public registerSearchables(items: Array<Searchable>): void {
    if (!items) {
      return;
    }
    if (items.length > 0) {
      this._registeredLayersWithSearchables++;
    }
    items.forEach(
      (item: Searchable) => this.registerSearchable(item)
    );
    if (this._expectedLayersWithSearchables === this._registeredLayersWithSearchables) {
      this._searchReady.next(true);
    }
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
