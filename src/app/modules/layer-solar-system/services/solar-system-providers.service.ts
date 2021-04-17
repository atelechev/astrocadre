import { Injectable, Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


/**
 * LayersProvider implementation for the LayerSolarSystemModule.
 */
@Injectable()
export class SolarSystemProvidersService implements LayersProvider {

  constructor(private readonly _factory: SolarSystemLayerFactoryService) {

  }

  public getRenderableLayer(model: Layer): SolarSystem {
    if (model?.code === 'solar-system') {
      return this._factory.buildRenderableLayer(model);
    }
    return undefined;
  }

  public getUiControlsComponentType(_: Layer): Type<LayerAware> {
    return undefined;
  }

}
