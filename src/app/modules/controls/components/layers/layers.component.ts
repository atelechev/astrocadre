import { Component } from '@angular/core';
import { LayerService } from '#core/services/layer.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';

/**
 * The root component for the choices of the layers to show.
 */
@Component({
  selector: 'ac-controls-layers',
  templateUrl: './layers.component.html'
})
export class LayersComponent {

  constructor(
    private readonly _layerService: LayerService,
    private readonly _layerProviders: LayerProvidersRegistryService
  ) {

  }

  public get layers(): Array<RenderableLayer> {
    return this._layerProviders.orderedCodes
      .map((code: string) => this._layerService.getRenderableLayer(code))
      .filter((layer: RenderableLayer) => !!layer);
  }

}
