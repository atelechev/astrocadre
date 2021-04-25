import { Injectable, Type } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { ConstellationsLayerFactoryService } from '#layer-constellations/services/factories/constellations-layer-factory.service';
import { Constellations } from '#layer-constellations/models/constellations';

/**
 * LayersProvider implementation for the LayerConstellationsModule.
 */
@Injectable()
export class ConstellationsProvidersService implements LayersProvider {

  private readonly _layerCode: string;

  constructor(
    private readonly _constellationsFactory: ConstellationsLayerFactoryService
  ) {
    this._layerCode = Constellations.CODE;
  }

  public getRenderableLayer(model: Layer): Constellations {
    const factory = this.getLayerFactory(model?.code);
    return factory?.buildRenderableLayer(model) as Constellations;
  }

  public getUiControlsComponentType(model: Layer): Type<LayerAware> {
    if (model?.code === this._layerCode) {
      return LayerConstellationsControlsComponent;
    }
    return undefined;
  }

  private getLayerFactory(code: string): LayerFactory {
    switch (code) {
      case this._layerCode:
        return this._constellationsFactory;
      default:
        return undefined;
    }
  }

}
