import { Injectable, Injector } from '@angular/core';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';

/**
 * Contains the references to all known LayersProvider instances.
 */
@Injectable()
export class LayerProvidersRegistryService {

  private readonly _layerProviders: Array<LayersProvider>;

  constructor(injector: Injector) {
    // TODO find a way to inject the modules dynamically, without hard-coding them here
    this._layerProviders = [
      injector.get(SkyGridProvidersService),
      injector.get(StarsProvidersService),
      injector.get(ConstellationsProvidersService),
      injector.get(MessierProvidersService)
    ];
  }

  public get layerProviders(): Array<LayersProvider> {
    return this._layerProviders;
  }

}
