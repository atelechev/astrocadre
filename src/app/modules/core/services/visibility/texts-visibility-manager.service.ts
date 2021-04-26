import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';

/**
 * Provides methods to manage the visibility of text objects.
 */
@Injectable({ providedIn: 'root' })
export class TextsVisibilityManagerService {

  private readonly _events: BehaviorSubject<LayerEvent<any>>;

  constructor(private readonly _layerService: LayerService) {
    this._events = new BehaviorSubject<LayerEvent<any>>(LayerEvent.INITIAL);
  }

  /**
   * Returns the Observable allowing to trace the layer events related with the visibility of texts.
   */
  public get events(): Observable<LayerEvent<any>> {
    return this._events;
  }

  /**
   * Shows all the text objects of the specified layer.
   *
   * @param code the code of the layer to show the texts for.
   */
  public showTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    this._events.next(new TextsShownEvent(layer));
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.showTexts(subLayer.code)
    );
  }

  /**
   * Hides all the text objects of the specified layer.
   *
   * @param code the code of the layer to hide the texts for.
   */
  public hideTexts(code: string): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    this._events.next(new TextsHiddenEvent(layer));
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.hideTexts(subLayer.code)
    );
  }

}
