import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { ThemeService } from '#core/services/theme.service';
import { ThemeEvent } from '#core/models/event/theme-event';

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

  public get rootLayer(): Layer {
    return this._rootLayer;
  }

  public set rootLayer(layer: Layer) {
    this._rootLayer = layer;
  }

  public getRenderableLayer(code: string): RenderableLayer {
    return this._renderableLayers.get(code);
  }

  public registerLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this.buildRenderable(layer);
    this._layerModels.set(layer.code, layer);
  }

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
