import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TreeNode } from '#core/tree-node';

/**
 * Used to exchange events and messages related with Themes.
 */
@Injectable()
export class ThemesEventService {

  private broadcastThemesListLoaded = new Subject<Array<TreeNode>>();

  private broadcastThemeLoaded = new Subject<string>();

  private requestThemeLoad = new Subject<string>();

  /**
   * Observable to subscribe to when a component should react on all available Themes list loading event.
   */
  public readonly broadcastThemesListLoaded$ = this.broadcastThemesListLoaded.asObservable();

  /**
   * Observable to subscribe to when a component should react on Theme loaded event.
   */
  public readonly broadcastThemeLoaded$ = this.broadcastThemeLoaded.asObservable();

  /**
   * Observable to subscribe to when a component should react on a request to load a Theme.
   */
  public readonly requestThemeLoad$ = this.requestThemeLoad.asObservable();


  /**
   * Broadcasts an event when the list of available Themes is loaded.
   *
   * @param themes the list of loaded themes to broadcast.
   */
  public themesListLoaded(themes: Array<TreeNode>): void {
    this.broadcastThemesListLoaded.next(themes);
  }

  /**
   * Broadcasts an event when a Theme is loaded.
   *
   * @param theme the name of the loaded theme.
   */
  public themeLoaded(theme: string): void {
    this.broadcastThemeLoaded.next(theme);
  }

  /**
   * Broadcasts an event when a Theme is requested to be loaded.
   *
   * @param theme the name of the Theme to load.
   */
  public loadThemeRequested(theme: string): void {
    this.requestThemeLoad.next(theme);
  }

}
