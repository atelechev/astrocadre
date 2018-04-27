import { Injectable } from '@angular/core';
import { Themes } from '../core/themes';
import { AbstractService } from '../core/abstract-service';
import { Response, Http } from '@angular/Http';
import { ThemeDefinition } from '../core/theme-definition';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ThemesService extends AbstractService {

  constructor(private http: Http) {
    super();
  }

  public getThemeDefinition(theme: Themes): Observable<ThemeDefinition> {
    const url = `/assets/themes/${theme}.json`;
    return this.http.get(url)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

}
