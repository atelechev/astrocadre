import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LayerVisibility } from './layer-visibility';
import { StarLabelVisibility } from './star-label-visibility';
import { TreeNode } from '../tree-node';

/**
 * Used to exchange events and messages related with layers rendered in the main viewport.
 */
@Injectable()
export class LayersEventService {

  // TODO add test
  private broadcastLayersTreeLoaded = new Subject<TreeNode>();

  private broadcastLayerLoaded = new Subject<string>();

  private requestLayerLoad = new Subject<TreeNode>();

  private requestLayerVisibility = new Subject<LayerVisibility>();

  private requestStarsMagnitude = new Subject<number>();

  private requestStarsLabelsVisibility = new Subject<StarLabelVisibility>();

  private requestStarsLabelsType = new Subject<string>();

  /**
   * Observable to subscribe to intercept event of loading the layers tree.
   */
  public readonly broadcastLayersTreeLoaded$ = this.broadcastLayersTreeLoaded.asObservable();

  /**
   * Observable to subscribe to intercept events when layers are loaded.
   */
  public readonly broadcastLayerLoaded$ = this.broadcastLayerLoaded.asObservable();

  /**
   * Observable to subscribe to when a layer is requested to be loaded.
   */
  public readonly requestLayerLoad$ = this.requestLayerLoad.asObservable();

  /**
   * Observable to subscribe to when a layer is requested to show or hide.
   */
  public readonly requestLayerVisibility$ = this.requestLayerVisibility.asObservable();

  /**
   * Observable to subscribe to when a stars layer with specific magnitude is requested to show or hide.
   */
  public readonly requestStarsMagnitude$ = this.requestStarsMagnitude.asObservable();

  /**
   * Observable to subscribe to when star labels are requested to show or hide.
   */
  public readonly requestStarsLabelsVisibility$ = this.requestStarsLabelsVisibility.asObservable();

  /**
   * Observable to subscribe to request star labels type change.
   */
  public readonly requestStarsLabelsType$ = this.requestStarsLabelsType.asObservable();

  /**
   * Broadcast an event when a layer is loaded.
   *
   * @param layer the name of the loaded layer.
   */
  public layerLoaded(layer: string): void {
    this.broadcastLayerLoaded.next(layer);
  }

  /**
   * Broadcast an event when the layers tree is loaded.
   *
   * @param tree the layers tree.
   */
  public layersTreeLoaded(tree: TreeNode): void {
    this.broadcastLayersTreeLoaded.next(tree);
  }

  /**
   * Broadcast an event when a layer is requested to load.
   *
   * @param layer the node of the layer to load in the whole layers tree.
   */
  public loadLayerRequested(layer: TreeNode): void {
    this.requestLayerLoad.next(layer);
  }

  /**
   * Broadcast an event when a layer is requested to show or hide.
   *
   * @param layerVisibility layer visibility parameters.
   */
  public layerVisibleRequested(layerVisibility: LayerVisibility): void {
    this.requestLayerVisibility.next(layerVisibility);
  }

  /**
   * Broadcast an event when stars of specific magnitude are requested to show.
   *
   * @param magnitude the max magnitude of stars to show.
   */
  public starsMagnitudeRequested(magnitude: number): void {
    this.requestStarsMagnitude.next(magnitude);
  }

  /**
   * Broadcast an event when star labels are requested to show or hide.
   *
   * @param labelVisibility star labels visibility parameters.
   */
  public starsLabelsVisibleRequested(labelVisibility: StarLabelVisibility): void {
    this.requestStarsLabelsVisibility.next(labelVisibility);
  }

  /**
   * Broadcast an event when star labels type is requested to change.
   *
   * @param labelType the type of star labels to show.
   */
  public starsLabelsTypeRequested(labelType: string): void {
    this.requestStarsLabelsType.next(labelType);
  }

}
