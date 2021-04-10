import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { StarsLayerFactoryService } from '#layer-stars/services/factories/stars-layer-factory.service';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { Stars } from '#layer-stars/models/stars';


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

}
