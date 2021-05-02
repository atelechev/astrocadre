import {
  Component,
  Input,
  Type,
} from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';
import { LayerService } from '#core/services/layer.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

/**
 * Provides the UI with the controls allowing to select whether a
 * layer of objects is shown in the viewport.
 */
@Component({
  selector: 'ac-controls-select-layer',
  templateUrl: './selector-layer.component.html'
})
export class SelectorLayerComponent {

  private _layer: RenderableLayer;

  private _controlsComponentType: Type<LayerAware>;

  constructor(
    private readonly _providersRegistry: LayerProvidersRegistryService,
    private readonly _layerService: LayerService
  ) {

  }

  @Input()
  public set layer(l: RenderableLayer) {
    this._layer = l;
    this.calculateControlsComponentType();
  }

  public get layer(): RenderableLayer {
    return this._layer;
  }

  public get isShown(): boolean {
    return this._layerService.isShown(this._layer.code);
  }

  public set isShown(show: boolean) {
    this._layerService.setVisible(this._layer.code, show);
  }

  public get subLayers(): Array<RenderableLayer> {
    return this._layer?.subLayers.map(
      (code: string) => this._layerService.getRenderableLayer(code)
    ).filter(
      (renderable: RenderableLayer) => !!renderable
    ) || [];
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
      .find(
        (provider: LayerProvider) => provider.code === this._layer.code
      )?.getUiControlsComponentType(this._layer.code);
  }

}
