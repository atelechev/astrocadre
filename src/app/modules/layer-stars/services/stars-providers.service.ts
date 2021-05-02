import { Injectable, Type } from '@angular/core';
import { StarsLayerFactoryService } from '#layer-stars/services/factories/stars-layer-factory.service';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { Stars } from '#layer-stars/models/stars';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerStarsControlsComponent } from '#layer-stars/components/layer-stars-controls/layer-stars-controls.component';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * LayersProvider implementation for the LayerStarsModule.
 */
@Injectable()
export class StarsProvidersService implements LayerProvider {


  constructor(private readonly _starsLayerFactory: StarsLayerFactoryService) {

  }

  public get code(): string {
    return Stars.CODE;
  }

  public getRenderableLayer(code: string): Promise<RenderableLayer> {
    if (!code || code.startsWith(Stars.CODE)) {
      return this._starsLayerFactory.buildRenderableLayer(code);
    }
    return Promise.reject(`Unexpected layer code: ${code}`);
  }

  public getUiControlsComponentType(code: string): Type<LayerAware> {
    if (code === Stars.CODE) {
      return LayerStarsControlsComponent;
    }
    return undefined;
  }

}
