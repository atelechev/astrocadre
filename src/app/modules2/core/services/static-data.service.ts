import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/modules2/core/models/theme';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';
import { environment } from '#environments/environment';

@Injectable()
export class StaticDataService {

  constructor(private readonly _httpClient: HttpClient) {

  }

  public getThemes(): Observable<Array<ThemeMeta>> {
    const url = this.getPathToJson('themes', 'themes');
    return this._httpClient.get<Array<ThemeMeta>>(url);
  }

  public getTheme(code: string): Observable<Theme> {
    const url = this.getPathToJson('themes', code);
    return this._httpClient.get<Theme>(url);
  }

  private getPathToJson(subPath: string, resourceName: string): string {
    const infix = subPath ? `${subPath}/` : '';
    const url = `/assets/${infix}${resourceName}.json`;
    return environment.pathInContext(url);
  }

}
