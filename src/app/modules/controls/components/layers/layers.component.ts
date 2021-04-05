import { Component } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerService } from '#core/services/layer.service';

/**
 * The root component for the choices of the layers to show.
 */
@Component({
  selector: 'ac-controls-layers',
  templateUrl: './layers.component.html'
})
export class LayersComponent {

  constructor(private readonly _layersService: LayerService) {

  }

  public get layers(): Array<Layer> {
    return this._layersService.rootLayer?.subLayers || [];
  }

}
