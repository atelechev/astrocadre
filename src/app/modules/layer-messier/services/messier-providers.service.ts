import { Injectable, Type } from '@angular/core';
import { Messier } from 'src/app/modules/layer-messier/models/messier';
import { MessierLayerFactoryService } from 'src/app/modules/layer-messier/services/factories/messier-layer.factory.service';
import { Layer } from '#core/models/layers/layer';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayersProvider } from '#core/models/layers/layers-provider';


@Injectable()
export class MessierProvidersService implements LayersProvider {

  constructor(private readonly _messierLayerFactory: MessierLayerFactoryService) {

  }

  public getRenderableLayer(model: Layer): Messier {
    if (model?.code === 'messier') {
      return this._messierLayerFactory.buildRenderableLayer(model);
    }
    return undefined;
  }

  public getUiControlsComponentType(_: Layer): Type<LayerAware> {
    return undefined;
  }

}
