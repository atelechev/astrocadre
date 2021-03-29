import { Component } from '@angular/core';
import { Layer } from 'src/app/modules/core/models/layer';
import { LayerService } from 'src/app/modules/core/services/layer.service';

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
