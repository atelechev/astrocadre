import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Layer } from 'src/app/modules2/core/models/layer';
import { Theme } from 'src/app/modules2/core/models/theme';

@Injectable()
export class EventsService {

  private readonly _themeLoaded: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(undefined);

  private readonly _layerLoaded: BehaviorSubject<Layer> = new BehaviorSubject<Layer>(undefined);


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

}
