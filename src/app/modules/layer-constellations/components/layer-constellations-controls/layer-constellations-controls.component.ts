import { Component } from '@angular/core';
import { LayerAware } from '#core/models/layers/layer-aware';
import { SelectableItem } from '#layer-constellations/models/selectable-item';
import { Layer } from '#core/models/layers/layer';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';

/**
 * Wraps the common controls for all the constellations sub-layers.
 */
@Component({
  selector: 'ac-layer-constellations-controls',
  templateUrl: './layer-constellations-controls.component.html'
})
export class LayerConstellationsControlsComponent extends LayerAware {

  private _options: Array<SelectableItem>;

  private _choices: Array<number>;

  constructor(private readonly _layersVisibilityManager: LayersVisibilityManagerService) {
    super();
    this._options = [];
  }

  public get layer(): Layer {
    return super.layer;
  }

  public set layer(model: Layer) {
    super.layer = model;
    this.updateOptions();
  }

  public set choices(ch: Array<number>) {
    this._choices = ch || [];
    this.updateShownSubLayers();
  }

  public get choices(): Array<number> {
    return this._choices;
  }

  public get options(): Array<SelectableItem> {
    return this._options;
  }

  private updateOptions(): void {
    this._options = this.layer?.subLayers?.map(
      (subLayer: Layer, i: number) => ({
        label: subLayer.label,
        value: i
      })) || [];
    this._choices = this._options.map(
      (opt: SelectableItem) => opt.value
    );
  }

  private updateShownSubLayers(): void {
    const choicesAsSet = new Set<number>(this._choices);
    this._options.forEach(
      (option: SelectableItem) => {
        const layerCode = this.layer.subLayers[option.value].code;
        if (choicesAsSet.has(option.value)) {
          this._layersVisibilityManager.showLayer(layerCode);
        } else {
          this._layersVisibilityManager.hideLayer(layerCode);
        }
      }
    );
  }

}
