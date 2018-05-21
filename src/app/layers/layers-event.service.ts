import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LayerVisibility } from '../core/layer-visibility';
import { StarLabelVisibility } from '../core/star-label-visibility';
import { ItemsTreeNode } from '../core/items-tree-node';


@Injectable()
export class LayersEventService {

  private broadcastLayerLoaded = new Subject<string>();

  private requestLayerLoad = new Subject<ItemsTreeNode>();

  private requestLayerVisibility = new Subject<LayerVisibility>();

  private requestStarsMagnitude = new Subject<number>();

  private requestStarsLabelsVisibility = new Subject<StarLabelVisibility>();

  private requestStarsLabelsType = new Subject<string>();

  public readonly broadcastLayerLoaded$ = this.broadcastLayerLoaded.asObservable();

  public readonly requestLayerLoad$ = this.requestLayerLoad.asObservable();

  public readonly requestLayerVisibility$ = this.requestLayerVisibility.asObservable();

  public readonly requestStarsMagnitude$ = this.requestStarsMagnitude.asObservable();

  public readonly requestStarsLabelsVisibility$ = this.requestStarsLabelsVisibility.asObservable();

  public readonly requestStarsLabelsType$ = this.requestStarsLabelsType.asObservable();

  public layerLoaded(layer: string): void {
    this.broadcastLayerLoaded.next(layer);
  }

  public loadLayerRequested(layer: ItemsTreeNode): void {
    this.requestLayerLoad.next(layer);
  }

  public layerVisibleRequested(layerVisibility: LayerVisibility): void {
    this.requestLayerVisibility.next(layerVisibility);
  }

  public starsMagnitudeRequested(magnitude: number): void {
    this.requestStarsMagnitude.next(magnitude);
  }

  public starsLabelsVisibleRequested(labelVisibility: StarLabelVisibility): void {
    this.requestStarsLabelsVisibility.next(labelVisibility);
  }

  public starsLabelsTypeRequested(labelType: string): void {
    this.requestStarsLabelsType.next(labelType);
  }

}
