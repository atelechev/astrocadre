import { Injectable } from '@angular/core';
import { Themes } from '../core/themes';
import { AbstractService } from '../core/abstract-service';
import { Http } from '@angular/Http';
import { ThemeDefinition } from '../core/theme-definition';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemesService extends AbstractService {

  constructor(http: Http) {
    super(http);
  }

  public getThemeDefinition(theme: Themes): Observable<ThemeDefinition> {
    const url = `/assets/themes/${theme}.json`;
    return this.execGetRequestForUrl(url);
  }

}
