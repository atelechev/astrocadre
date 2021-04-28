import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { ThemeService } from '#core/services/theme.service';
import { ThemeEvent } from '#core/models/event/theme-event';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';

/**
 * Holds the information of the current layers tree and
 * provides the accessors to the layers.
 */
@Injectable({ providedIn: 'root' })
export class LayerService {

  private _rootLayer: Layer;

  private readonly _events: BehaviorSubject<LayerEvent<any>>;

  private readonly _shownLayers: Set<string>;

  private readonly _flatDepthFirstLayers: Array<Layer>;

  private readonly _layerModels: Map<string, Layer>;

  private readonly _renderableLayers: Map<string, RenderableLayer>;

  constructor(private readonly _themeService: ThemeService) {
    this._shownLayers = new Set<string>();
    this._events = new BehaviorSubject<LayerEvent<any>>(LayerEvent.INITIAL);
    this._rootLayer = undefined;
    this._layerModels = new Map<string, Layer>();
    this._renderableLayers = new Map<string, RenderableLayer>();
    this._flatDepthFirstLayers = [];
  }

  /**
   * Returns the root layer model reference.
   */
  public get rootLayer(): Layer {
    return this._rootLayer;
  }

  /**
   * Sets the root layer model reference.
   */
  public set rootLayer(layer: Layer) {
    this._rootLayer = layer;
    this.rebuildFlatDepthFirstLayers();
  }

  /**
   * Returns the renderable layer having the specified code.
   *
   * @param code the code of the layer to retrieve.
   * @returns RenderableLayer the layer ref.
   */
  public getRenderableLayer(code: string): RenderableLayer {
    return this._renderableLayers.get(code);
  }

  /**
   * Registers the specified layer among the known layers and
   * triggers the building of the corresponding renderable.
   *
   * @param layer the model object to register.
   */
  public registerLayer(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    this._themeService.events
      .subscribe(
        (event: ThemeEvent<any>) => layer.applyTheme(event.data)
      );
    this._renderableLayers.set(layer.code, layer);
    this._layerModels.set(layer.code, layer.model);
  }

  /**
   * Returns the layer model reference for the specified layer code.
   *
   * @param code the layer code to get the model for.
   * @returns Layer the model ref.
   */
  public getModel(code: string): Layer {
    return this._layerModels.get(code);
  }

  /**
   * Returns the index of the layer with the given code, that this
   * layer has in the flattened list of all available layers.
   *
   * The value of this index affects the distance at which the objects
   * of this layer are drawn on the virtual shere.
   *
   * @param code the code of the layer to retrieve the index for.
   * @returns number the index of the layer or -1 if it was not found.
   */
  public getIndex(code: string): number {
    return this._flatDepthFirstLayers.findIndex(
      (layer: Layer) => layer.code === code
    );
  }

  /**
   * Returns the Observable allowing to trace the layer events related with the visibility of objects.
   */
  public get events(): Observable<LayerEvent<any>> {
    return this._events;
  }

  /**
   * Returns true if the objects of the specified layer are shown in the view.
   *
   * @param code the code of the layer to check.
   * @returns boolean true if the objects are shown.
   */
  public isShown(code: string): boolean {
    return !!code && this._shownLayers.has(code);
  }

  /**
   * Sets the specified layer visible or hidden.
   *
   * @param code the code of the layer to show/hide.
   * @param visible true to show, false to hide.
   */
  public setVisible(code: string, visible: boolean): void {
    const renderable = this.getRenderableLayer(code);
    if (!renderable) {
      return;
    }
    if (visible) {
      this.showLayer(renderable);
    } else {
      this.hideLayer(renderable);
    }
  }

  private rebuildFlatDepthFirstLayers(): void {
    this._flatDepthFirstLayers.splice(0, this._flatDepthFirstLayers.length);
    if (this._rootLayer) {
      this._rootLayer.subLayers?.forEach(
        (subLayer: Layer) => this.flattenLayer(subLayer)
      );
    }
  }

  private flattenLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this._flatDepthFirstLayers.push(layer);
    if (layer.subLayers) {
      layer.subLayers.forEach((subLayer: Layer) => this.flattenLayer(subLayer));
    }
  }

  private showLayer(layer: RenderableLayer): void {
    this._shownLayers.add(layer.code);
    this._events.next(new LayerShownEvent(layer));
    this.processSubLayersVisibility(layer, true);
  }

  private hideLayer(layer: RenderableLayer): void {
    this._shownLayers.delete(layer.code);
    this._events.next(new LayerHiddenEvent(layer));
    this.processSubLayersVisibility(layer, false);
  }

  private processSubLayersVisibility(layer: Layer, visible: boolean): void {
    if (layer?.subLayers) {
      layer.subLayers
        .forEach(
          (subLayer: Layer) => this.setVisible(subLayer.code, visible)
        );
    }
  }

}
