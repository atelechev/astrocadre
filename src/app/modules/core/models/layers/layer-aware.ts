import { Directive, Input } from '@angular/core';
import { Layer } from '#core/models/layers/layer';

/**
 * Provides the access to the layer associated with the implementor.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class LayerAware {

  private _layer: Layer;

  @Input()
  public set layer(model: Layer) {
    this._layer = model;
  }

  public get layer(): Layer {
    return this._layer;
  }

}
