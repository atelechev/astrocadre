import { Component, Input } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { LayerService } from 'src/app/modules2/core/services/layer.service';


@Component({
  selector: 'ac-controls-select-layer',
  templateUrl: './selector-layer.component.html',
  styleUrls: ['./selector-layer.component.css']
})
export class SelectorLayerComponent {

  private _layer: Layer;

  constructor(private readonly _layerService: LayerService) {

  }

  @Input()
  public set layer(l: Layer) {
    this._layer = l;
  }

  public get layer(): Layer {
    return this._layer;
  }

  public get isShown(): boolean {
    return this._layerService.isShown(this._layer.code);
  }

  public toggleLayerShown(): void {
    this._layerService.toggleLayerShown(this._layer.code);
  }

  public get subLayers(): Array<Layer> {
    return this._layer?.subLayers || [];
  }

}
