import { Injectable, Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { StarsLayerFactoryService } from '#layer-stars/services/factories/stars-layer-factory.service';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { Stars } from '#layer-stars/models/stars';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerStarsControlsComponent } from '#layer-stars/components/layer-stars-controls/layer-stars-controls.component';

/**
 * LayersProvider implementation for the LayerStarsModule.
 */
@Injectable()
export class StarsProvidersService implements LayersProvider {

  constructor(private readonly _starsLayerFactory: StarsLayerFactoryService) {

  }

  public getRenderableLayer(model: Layer): Stars {
    if (model?.code.startsWith('stars')) {
      return this._starsLayerFactory.buildRenderableLayer(model);
    }
    return undefined;
  }

  public getUiControlsComponentType(model: Layer): Type<LayerAware> {
    if (model?.code === 'stars') {
      return LayerStarsControlsComponent;
    }
    return undefined;
  }

}
