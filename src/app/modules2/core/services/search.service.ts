import { Injectable } from '@angular/core';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';

@Injectable()
export class SearchService {

  private _searchables: Array<Searchable>;

  constructor(private readonly _dataService: StaticDataService) {
    this._searchables = [];
    this.loadSearchables();
  }

  private loadSearchables(): void {
    this._dataService
      .getDataJson('searchable-items')
      .subscribe(
        (items: Array<any>) => this._searchables = items
      );
  }

}
