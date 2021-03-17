import { Component } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html'
})
export class SelectorStarNamesComponent {


  constructor(
    private readonly _layerService: LayerService,
    private readonly _eventsService: EventsService
  ) {

  }

  private get renderableLayer(): RenderableLayer {
    return this._layerService.getRenderableLayer(SupportedLayers.STARS);
  }

  public get areNamesShown(): boolean {
    return this.renderableLayer.areTextsShown;
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  public toggleNamesShown(value: boolean): void {
    const renderable = this.renderableLayer;
    if (value) {
      this.showTexts(renderable);
    } else {
      this.hideTexts(renderable);
    }
  }

  private showTexts(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    layer.showTexts();
    this._eventsService.fireTextsShown(layer);
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const renderable = this._layerService.getRenderableLayer(subLayer.code);
        this.showTexts(renderable);
      }
    );
  }

  private hideTexts(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    layer.hideTexts();
    this._eventsService.fireTextsHidden(layer);
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const renderable = this._layerService.getRenderableLayer(subLayer.code);
        this.hideTexts(renderable);
      }
    );
  }

}
