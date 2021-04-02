import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

@Injectable()
export class EventsService {

  private readonly _layerShown: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

  private readonly _layerHidden: BehaviorSubject<RenderableLayer> = new BehaviorSubject<RenderableLayer>(undefined);

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

}
