import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
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
   * Shows or hides the texts of the specified layer.
   *
   * @param code the code of the layer.
   * @param visible true to show, false to hide the texts.
   */
  public setTextsVisible(code: string, visible: boolean): void {
    const layer = this._layerService.getRenderableLayer(code);
    if (!layer) {
      return;
    }
    const event = visible ? new TextsShownEvent(layer) : new TextsHiddenEvent(layer);
    this._events.next(event);
    layer.subLayers.forEach(
      (subLayer: string) => this.setTextsVisible(subLayer, visible)
    );
  }

}
