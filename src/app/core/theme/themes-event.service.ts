import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ThemesEventService {

  private broadcastThemeLoaded = new Subject<string>();

  private requestThemeLoad = new Subject<string>();

  public readonly broadcastThemeLoaded$ = this.broadcastThemeLoaded.asObservable();

  public readonly requestThemeLoad$ = this.requestThemeLoad.asObservable();

  public themeLoaded(theme: string): void {
    this.broadcastThemeLoaded.next(theme);
  }

  public loadThemeRequested(theme: string): void {
    this.requestThemeLoad.next(theme);
  }

}
