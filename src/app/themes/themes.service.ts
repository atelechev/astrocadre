import { Injectable } from '@angular/core';
import { AbstractService } from '../core/abstract-service';
import { Http } from '@angular/Http';
import { ThemeDefinition } from '../core/theme/theme-definition';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemesService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getThemeDefinition(theme: string): Observable<ThemeDefinition> {
    const url = `/assets/themes/${theme}.json`;
    return this.execGetRequestForUrl(url);
  }

}
