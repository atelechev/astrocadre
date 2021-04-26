import {
  Component,
  Input,
  Type,
} from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayersProvider } from '#core/models/layers/layers-provider';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';

/**
 * Provides the UI with the controls allowing to select whether a
 * layer of objects is shown in the viewport.
 */
@Component({
  selector: 'ac-controls-select-layer',
  templateUrl: './selector-layer.component.html'
})
export class SelectorLayerComponent {

  private _layer: Layer;

  private _controlsComponentType: Type<LayerAware>;

  constructor(
    private readonly _providersRegistry: LayerProvidersRegistryService,
    private readonly _visibilityManager: LayersVisibilityManagerService
  ) {

  }

  @Input()
  public set layer(l: Layer) {
    this._layer = l;
    this.calculateControlsComponentType();
  }

  public get layer(): Layer {
    return this._layer;
  }

  public get isShown(): boolean {
    return this._visibilityManager.isShown(this._layer.code);
  }

  public set isShown(show: boolean) {
    this._visibilityManager.setVisible(this._layer.code, show);
  }

  public get subLayers(): Array<Layer> {
    return this._layer?.subLayers || [];
  }

  public get hasCustomUiControls(): boolean {
    return !!this._controlsComponentType;
  }

  public get controlsComponentType(): Type<LayerAware> {
    return this._controlsComponentType;
  }

  private calculateControlsComponentType(): void {
    if (!this._layer) {
      return;
    }
    this._controlsComponentType = this._providersRegistry
      .layerProviders
      .map(
        (provider: LayersProvider) => provider.getUiControlsComponentType(this._layer)
      ).find(
        (type: Type<LayerAware>) => !!type
      );
  }

}
