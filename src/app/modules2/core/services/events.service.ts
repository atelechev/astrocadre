import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from 'src/app/modules2/core/models/theme';

@Injectable()
export class EventsService {

  private readonly _themeLoaded: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(undefined);


  public fireThemeLoaded(theme: Theme): void {
    this._themeLoaded.next(theme);
  }

  public get themeLoaded(): Observable<Theme> {
    return this._themeLoaded;
  }

}
