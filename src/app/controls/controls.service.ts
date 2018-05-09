import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/Http';
import { AbstractService } from '../core/abstract-service';
import { SectionMetadata } from './section-metadata';
import { Observable } from 'rxjs/Observable';
import { SearchableItem } from './searchable-item';

@Injectable()
export class ControlsService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getAvailableThemes(): Observable<SectionMetadata> {
    const url = '/assets/themes/themes.json';
    return this.execGetRequestForUrl(url);
  }

  public getAvailableLayers(): Observable<SectionMetadata> {
    const url = '/assets/layers.json';
    return this.execGetRequestForUrl(url);
  }

  public getSearchableItems(): Observable<SearchableItem[]> {
    const url = 'assets/constellations.json';
    return this.execGetRequestForUrl(url);
  }

}
