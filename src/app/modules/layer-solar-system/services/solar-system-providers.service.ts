import { Injectable, Type } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';


/**
 * LayersProvider implementation for the LayerSolarSystemModule.
 */
@Injectable()
export class SolarSystemProvidersService implements LayerProvider {

  constructor(private readonly _factory: SolarSystemLayerFactoryService) {

  }

  public get code(): string {
    return SolarSystem.CODE;
  }

  public getRenderableLayer(): Promise<SolarSystem> {
    return this._factory.buildRenderableLayer();
  }

  public getUiControlsComponentType(): Type<LayerAware> {
    return SelectorSolarSystemObjectsComponent;
  }

}
