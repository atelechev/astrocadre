import { Component } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['../controls-common.css']
})
export class LayersComponent {

  constructor(private readonly _layersService: LayerService) {

  }

  public get layers(): Array<Layer> {
    return this._layersService.rootLayer?.subLayers || [];
  }

}
