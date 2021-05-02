import { Injectable, Injector } from '@angular/core';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';

/**
 * Contains the references to all known LayersProvider instances.
 */
@Injectable()
export class LayerProvidersRegistryService {

  private readonly _layerProviders: Array<LayerProvider>;

  private readonly _layerCodes: Array<string>;

  constructor(injector: Injector) {
    this._layerProviders = [
      injector.get(SkyGridProvidersService),
      injector.get(StarsProvidersService),
      injector.get(ConstellationsProvidersService),
      injector.get(MessierProvidersService),
      injector.get(SolarSystemProvidersService)
    ];
    this._layerCodes = this._layerProviders.map((provider: LayerProvider) => provider.code);
  }

  /**
   * Returns an array containing all known LayerProvier instances.
   */
  public get layerProviders(): Array<LayerProvider> {
    return this._layerProviders;
  }

  public get orderedCodes(): Array<string> {
    return this._layerCodes;
  }

}
