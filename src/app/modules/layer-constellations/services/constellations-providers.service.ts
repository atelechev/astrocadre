import { Injectable, Type } from '@angular/core';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';
import { Constellations } from '#layer-constellations/models/constellations';

/**
 * LayersProvider implementation for the LayerConstellationsModule.
 */
@Injectable()
export class ConstellationsProvidersService implements LayerProvider {

  constructor(
    private readonly _constellationsFactory: ConstellationsLayerFactoryService
  ) {

  }

  public get code(): string {
    return Constellations.CODE;
  }

  public getRenderableLayer(): Promise<Constellations> {
    return this._constellationsFactory.buildRenderableLayer();
  }

  public getUiControlsComponentType(): Type<LayerAware> {
    return LayerConstellationsControlsComponent;
  }

}
