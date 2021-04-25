import { Injectable, Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';


/**
 * LayersProvider implementation for the LayerSolarSystemModule.
 */
@Injectable()
export class SolarSystemProvidersService implements LayersProvider {

  private readonly _layerCode: string;

  constructor(private readonly _factory: SolarSystemLayerFactoryService) {
    this._layerCode = SolarSystem.CODE;
  }

  public getRenderableLayer(model: Layer): SolarSystem {
    if (model?.code === this._layerCode) {
      return this._factory.buildRenderableLayer(model);
    }
    return undefined;
  }

  public getUiControlsComponentType(model: Layer): Type<LayerAware> {
    if (model?.code === this._layerCode) {
      return SelectorSolarSystemObjectsComponent;
    }
    return undefined;
  }

}
