import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewContainerRef
  } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';

/**
 * Instantiates custom controls for pluggable layers and
 * dynamically inserts them into the view.
 *
 * This component does not have its own template, because its role
 * is to be a wrapper for another component from a layer module.
 */
@Component({
  selector: 'ac-custom-controls',
  template: ''
})
export class CustomControlsComponent extends LayerAware
  implements OnInit {

  private _customComponentType: Type<LayerAware>;

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _containerRef: ViewContainerRef
  ) {
    super();
    this._customComponentType = undefined;
  }

  @Input()
  public set customComponentType(compType: Type<LayerAware>) {
    this._customComponentType = compType;
  }

  public ngOnInit(): void {
    this.loadCustomControls();
  }

  private loadCustomControls(): void {
    const cmpFactory = this._resolver.resolveComponentFactory(this._customComponentType);
    const cmpRef = this._containerRef.createComponent<LayerAware>(cmpFactory);
    cmpRef.instance.layer = this.layer;
  }

}
