import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimension } from 'src/app/modules2/core/models/dimension';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { Theme } from 'src/app/modules2/core/models/theme';

@Injectable()
export class EventsService {

  private readonly _themeChanged: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(undefined);

  private readonly _layerShown: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _layerHidden: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  // TODO the text* events are probably not necessary
  private readonly _textsShown: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _textsHidden: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _viewportChanged: BehaviorSubject<Dimension> = new BehaviorSubject<Dimension>(undefined);


  public fireThemeChanged(theme: Theme): void {
    this._themeChanged.next(theme);
  }

  public get themeChanged(): Observable<Theme> {
    return this._themeChanged;
  }

  public fireLayerShown(layer: RenderableLayer): void {
    this._layerShown.next(layer);
  }

  public get layerShown(): Observable<RenderableLayer> {
    return this._layerShown;
  }

  public fireLayerHidden(layer: RenderableLayer): void {
    this._layerHidden.next(layer);
  }

  public get layerHidden(): Observable<RenderableLayer> {
    return this._layerHidden;
  }

  public fireTextsShown(layer: RenderableLayer): void {
    this._textsShown.next(layer);
  }

  public get textsShown(): Observable<RenderableLayer> {
    return this._textsShown;
  }

  public fireTextsHidden(layer: RenderableLayer): void {
    this._textsHidden.next(layer);
  }

  public get textsHidden(): Observable<RenderableLayer> {
    return this._textsHidden;
  }

  public fireViewportChanged(size?: Dimension) {
    this._viewportChanged.next(size);
  }

  public get viewportChanged(): Observable<Dimension> {
    return this._viewportChanged;
  }

}
