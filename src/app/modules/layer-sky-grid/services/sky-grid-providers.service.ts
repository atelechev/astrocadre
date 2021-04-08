import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { SkyGridLayerFactory } from '#layer-sky-grid/models/sky-grid-layer-factory';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';


@Injectable()
export class SkyGridProvidersService implements LayersProvider {

  public getRenderableLayer(model: Layer): SkyGrid {
    if (model?.code === 'sky-grid') {
      return new SkyGridLayerFactory(new AxialCurvesFactory()).buildRenderableLayer(model);
    }
    return undefined;
  }

}
