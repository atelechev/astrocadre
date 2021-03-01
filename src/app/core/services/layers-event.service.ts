import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StarLabelVisibility } from '#core/models/star-label-visibility';
import { TreeNode } from '#core/models/tree-node';

/**
 * Used to exchange events and messages related with layers rendered in the main viewport.
 */
@Injectable()
export class LayersEventService {

  private broadcastLayersTreeLoaded = new Subject<TreeNode>();

  private broadcastLayerLoaded = new Subject<string>();

  private requestLayerLoad = new Subject<TreeNode>();

  private requestLayerVisibility = new Subject<TreeNode>();

  private requestStarsMagnitude = new Subject<number>();

  private requestStarsLabelsVisibility = new Subject<StarLabelVisibility>();

  private requestStarsLabelsType = new Subject<string>();

  /**
   * Observable to subscribe to intercept event of loading the layers tree.
   */
  public get broadcastLayersTreeLoaded$(): Observable<TreeNode> {
    return this.broadcastLayersTreeLoaded;
  }

  /**
   * Observable to subscribe to intercept events when layers are loaded.
   */
  public get broadcastLayerLoaded$(): Observable<string> {
    return this.broadcastLayerLoaded;
  }

  /**
   * Observable to subscribe to when a layer is requested to be loaded.
   */
  public get requestLayerLoad$(): Observable<TreeNode> {
    return this.requestLayerLoad;
  }

  /**
   * Observable to subscribe to when a layer is requested to show or hide.
   */
  public get requestLayerVisibility$(): Observable<TreeNode> {
    return this.requestLayerVisibility;
  }

  /**
   * Observable to subscribe to when a stars layer with specific magnitude is requested to show or hide.
   */
  public get requestStarsMagnitude$(): Observable<number> {
    return this.requestStarsMagnitude.asObservable();
  };

  /**
   * Observable to subscribe to when star labels are requested to show or hide.
   */
  public get requestStarsLabelsVisibility$(): Observable<StarLabelVisibility> {
    return this.requestStarsLabelsVisibility;
  }

  /**
   * Observable to subscribe to request star labels type change.
   */
  public get requestStarsLabelsType$(): Observable<string> {
    return this.requestStarsLabelsType.asObservable();
  }

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
   * Broadcast an event when a layer was requested to show or hide (selected/unselected).
   *
   * @param layer the node of the layer, with its 'selected' property set to requested visibility.
   */
  public layerVisibleRequested(layer: TreeNode): void {
    this.requestLayerVisibility.next(layer);
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
