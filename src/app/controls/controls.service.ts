import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/Http';
import { AbstractService } from '../core/abstract-service';
import { SectionMetadata } from './section-metadata';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ControlsService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getAvailableThemes(): Observable<SectionMetadata> {
    const url = '/assets/themes/themes.json';
    return this.execGetRequestForUrl(url);
  }

}
