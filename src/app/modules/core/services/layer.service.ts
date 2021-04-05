import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { ThemeService } from '#core/services/theme.service';
import { ThemeEvent } from '#core/models/event/theme-event';

/**
 * Holds the information of the current layers tree and
 * provides the accessors to the layers.
 */
@Injectable()
export class LayerService {

  private _rootLayer: Layer;

  private readonly _layerModels: Map<string, Layer>;

  private readonly _renderableLayers: Map<string, RenderableLayer>;

  constructor(
    private readonly _layersFactory: LayersFactoryService,
    private readonly _themeService: ThemeService
  ) {
    this._rootLayer = undefined;
    this._layerModels = new Map<string, Layer>();
    this._renderableLayers = new Map<string, RenderableLayer>();
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
  public registerLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this.buildRenderable(layer);
    this._layerModels.set(layer.code, layer);
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

  private buildRenderable(layer: Layer): RenderableLayer {
    const renderable = this._layersFactory.buildRenderableLayer(layer);
    if (renderable) {
      this._themeService.events
        .subscribe(
          (event: ThemeEvent<any>) => renderable.applyTheme(event.data)
        );
      this._renderableLayers.set(layer.code, renderable);
    }
    return renderable;
  }

}
