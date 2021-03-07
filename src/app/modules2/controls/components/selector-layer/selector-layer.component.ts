import { Component, Input } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';


@Component({
  selector: 'ac-controls-select-layer',
  templateUrl: './selector-layer.component.html'
})
export class SelectorLayerComponent {

  private _layer: Layer;

  @Input()
  public set layer(l: Layer) {
    this._layer = l;
  }

  public get layer(): Layer {
    return this._layer;
  }

}
