import { Injectable } from '@angular/core';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { Layer } from '#core/models/layers/layer';
import { StarsLayerFactory } from '#layer-stars/models/stars-layer-factory';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { Stars } from '#layer-stars/models/stars';


@Injectable()
export class StarsProvidersService implements LayersProvider {

  public getRenderableLayer(model: Layer): Stars {
    if (model?.code.startsWith('stars')) {
      return new StarsLayerFactory(new PointsFactory()).buildRenderableLayer(model);
    }
    return undefined;
  }

}
