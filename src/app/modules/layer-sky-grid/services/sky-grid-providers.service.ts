import { Injectable, Type } from '@angular/core';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { LayerAware } from '#core/models/layers/layer-aware';

/**
 * LayersProvider implementation for the LayerSkyGridModule.
 */
@Injectable()
export class SkyGridProvidersService implements LayerProvider {

  constructor(private readonly _skyGridFactory: SkyGridLayerFactoryService) {

  }

  public get code(): string {
    return SkyGrid.CODE;
  }

  public getRenderableLayer(): Promise<SkyGrid> {
    return this._skyGridFactory.buildRenderableLayer();
  }

  public getUiControlsComponentType(): Type<LayerAware> {
    return undefined;
  }

}
