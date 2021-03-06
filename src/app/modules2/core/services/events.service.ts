import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimension } from 'src/app/modules2/core/models/dimension';
import { Layer } from 'src/app/modules2/core/models/layer';
import { Theme } from 'src/app/modules2/core/models/theme';

@Injectable()
export class EventsService {

  private readonly _themeLoaded: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(undefined);

  private readonly _layerLoaded: BehaviorSubject<Layer> = new BehaviorSubject<Layer>(undefined);

  private readonly _viewportSizeChanged: BehaviorSubject<Dimension> = new BehaviorSubject<Dimension>(undefined);


  public fireThemeLoaded(theme: Theme): void {
    this._themeLoaded.next(theme);
  }

  public get themeLoaded(): Observable<Theme> {
    return this._themeLoaded;
  }

  public fireLayerLoaded(layer: Layer): void {
    this._layerLoaded.next(layer);
  }

  public get layerLoaded(): Observable<Layer> {
    return this._layerLoaded;
  }

  public fireViewportSizeChanged(size: Dimension) {
    this._viewportSizeChanged.next(size);
  }

  public get viewportSizeChanged(): Observable<Dimension> {
    return this._viewportSizeChanged;
  }

}
