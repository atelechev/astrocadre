import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { ThemeService } from '#core/services/theme.service';
import { ThemeEvent } from '#core/models/event/theme-event';

/**
 * Holds the information of the current layers tree and
 * provides the accessors to the layers.
 */
@Injectable({ providedIn: 'root' })
export class LayerService {

  private _rootLayer: Layer;

  private readonly _flatDepthFirstLayers: Array<Layer>;

  private readonly _layerModels: Map<string, Layer>;

  private readonly _renderableLayers: Map<string, RenderableLayer>;

  constructor(private readonly _themeService: ThemeService) {
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

}
