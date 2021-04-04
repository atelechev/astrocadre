import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';


@Injectable()
export class TextsVisibilityManagerService {

  private readonly _events: BehaviorSubject<LayerEvent<any>>;

  constructor(private readonly _layerService: LayerService) {
    this._events = new BehaviorSubject<LayerEvent<any>>(LayerEvent.INITIAL);
  }

  public get events(): Observable<LayerEvent<any>> {
    return this._events;
  }

  public showTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    layer.showTexts();
    this._events.next(new TextsShownEvent(layer));
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.showTexts(subLayer.code)
    );
  }

  public hideTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    layer.hideTexts();
    this._events.next(new TextsHiddenEvent(layer));
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.hideTexts(subLayer.code)
    );
  }

}
