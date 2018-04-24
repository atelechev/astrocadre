import { Injectable } from '@angular/core';
import { Themes } from './themes';
import { Response, Http } from '@angular/Http';
import { ThemeDefinition } from './theme-definition';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ThemesService {

  private availableThemes = [ Themes.DEV, Themes.SKY_CHART ];

  constructor(private http: Http) {

  }

  public getThemeDefinition(themeName: string): Observable<ThemeDefinition> {
    const url = `/assets/themes/${themeName}.json`;
    return this.http.get(url)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  public getThemeDefinitions(): Observable<ThemeDefinition[]> {
    return Observable.forkJoin(this.availableThemes.map(themeName => this.getThemeDefinition(themeName)));
  }

  // TODO introduce shared generic error handling
  private handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return Observable.throw(res);
    }
    return Observable.throw('Failed to retrieve data JSON from server.');
  }

}
