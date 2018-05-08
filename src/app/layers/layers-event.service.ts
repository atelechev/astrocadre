import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LayerVisibility } from '../core/layer-visibility';


@Injectable()
export class LayersEventService {

  private broadcastLayerLoaded = new Subject<string>();

  private requestLayerLoad = new Subject<string>();

  private requestLayerVisibility = new Subject<LayerVisibility>();

  private requestStarsMagnitude = new Subject<number>();

  public readonly broadcastLayerLoaded$ = this.broadcastLayerLoaded.asObservable();

  public readonly requestLayerLoad$ = this.requestLayerLoad.asObservable();

  public readonly requestLayerVisibility$ = this.requestLayerVisibility.asObservable();

  public readonly requestStarsMagnitude$ = this.requestStarsMagnitude.asObservable();

  public layerLoaded(layer: string): void {
    this.broadcastLayerLoaded.next(layer);
  }

  public loadLayerRequested(layer: string): void {
    this.requestLayerLoad.next(layer);
  }

  public layerVisibleRequested(layerVisibility: LayerVisibility): void {
    this.requestLayerVisibility.next(layerVisibility);
  }

  public starsMagnitudeRequested(magnitude: number): void {
    this.requestStarsMagnitude.next(magnitude);
  }

}
