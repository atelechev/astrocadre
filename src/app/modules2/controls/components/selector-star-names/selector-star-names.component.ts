import { Component } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';

@Component({
  selector: 'ac-controls-select-star-names',
  templateUrl: './selector-star-names.component.html',
  styleUrls: [
    './selector-star-names.component.css'
  ]
})
export class SelectorStarNamesComponent {

  constructor(
    private readonly _layerService: LayerService,
    private readonly _eventsService: EventsService
  ) {

  }

  private get starsLayer(): Stars {
    return this._layerService.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

  public get isDisabled(): boolean {
    return !this._layerService.isShown(SupportedLayers.STARS);
  }

  public get namesShown(): boolean {
    return this.starsLayer.areTextsShown;
  }

  public set namesShown(shown: boolean) {
    const renderable = this.starsLayer;
    if (shown) {
      this.showTexts(renderable);
    } else {
      this.hideTexts(renderable);
    }
  }

  public get useProperNames(): boolean {
    return this.starsLayer.properNamesShown;
  }

  public set useProperNames(use: boolean) {
    const layer = this.starsLayer;
    this.hideTexts(layer);
    this.toggleNamesType(layer, use);
    this.showTexts(layer);
  }

  private toggleNamesType(layer: Stars, useProper: boolean): void {
    if (useProper) {
      layer.showProperNames();
    } else {
      layer.showStandardNames();
    }
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const starsSublayer = this._layerService.getRenderableLayer(subLayer.code) as Stars;
        this.toggleNamesType(starsSublayer, useProper);
      }
    );
  }

  private showTexts(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    layer.showTexts();
    this._eventsService.fireTextsShown(layer); // TODO call showLayer directly, no need to use the events
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
