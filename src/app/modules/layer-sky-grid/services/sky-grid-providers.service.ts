import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';


@Injectable()
export class SkyGridProvidersService implements LayersProvider {

  constructor(private readonly _skyGridFactory: SkyGridLayerFactoryService) {

  }

  public getRenderableLayer(model: Layer): SkyGrid {
    if (model?.code === 'sky-grid') {
      return this._skyGridFactory.buildRenderableLayer(model);
    }
    return undefined;
  }

}
