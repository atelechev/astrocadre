import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  public get broadcastThemesListLoaded$(): Observable<Array<TreeNode>> {
    return this.broadcastThemesListLoaded;
  }

  /**
   * Observable to subscribe to when a component should react on Theme loaded event.
   */
  public get broadcastThemeLoaded$(): Observable<string> {
    return this.broadcastThemeLoaded;
  }

  /**
   * Observable to subscribe to when a component should react on a request to load a Theme.
   */
  public get requestThemeLoad$(): Observable<string> {
    return this.requestThemeLoad;
  }

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
