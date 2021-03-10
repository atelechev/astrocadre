import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimension } from 'src/app/modules2/core/models/dimension';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { Theme } from 'src/app/modules2/core/models/theme';

@Injectable()
export class EventsService {

  private readonly _themeLoaded: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(undefined);

  private readonly _layerShown: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _layerHidden: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _viewportSizeChanged: BehaviorSubject<Dimension> = new BehaviorSubject<Dimension>(undefined);


  public fireThemeLoaded(theme: Theme): void {
    this._themeLoaded.next(theme);
  }

  public get themeLoaded(): Observable<Theme> {
    return this._themeLoaded;
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

  public fireViewportSizeChanged(size: Dimension) {
    this._viewportSizeChanged.next(size);
  }

  public get viewportSizeChanged(): Observable<Dimension> {
    return this._viewportSizeChanged;
  }

}
