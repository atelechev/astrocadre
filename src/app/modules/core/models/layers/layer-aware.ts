import { Directive, Input } from '@angular/core';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides the access to the layer associated with the implementor.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class LayerAware {

  private _layer: RenderableLayer;

  @Input()
  public set layer(layer: RenderableLayer) {
    this._layer = layer;
  }

  public get layer(): RenderableLayer {
    return this._layer;
  }

}
