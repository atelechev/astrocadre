import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';

/**
 * Provides methods to manage the visibility of layers of objects.
 */
@Injectable({ providedIn: 'root' })
export class LayersVisibilityManagerService {

  private readonly _events: BehaviorSubject<LayerEvent<any>>;

  private readonly _shownLayers: Set<string>;

  constructor(private readonly _layerService: LayerService) {
    this._shownLayers = new Set<string>();
    this._events = new BehaviorSubject<LayerEvent<any>>(LayerEvent.INITIAL);
  }

  /**
   * Returns the Observable allowing to trace the layer events related with the visibility of objects.
   */
  public get events(): Observable<LayerEvent<any>> {
    return this._events;
  }

  /**
   * Returns true if the objects of the specified layer are shown in the view.
   *
   * @param code the code of the layer to check.
   * @returns boolean true if the objects are shown.
   */
  public isShown(code: string): boolean {
    return !!code && this._shownLayers.has(code);
  }

  /**
   * Shows the objects of the specified layer.
   *
   * @param code the code of the layer to show the objects for.
   */
  public showLayer(code: string): void {
    const layer = this._layerService.getModel(code);
    if (!layer) {
      return;
    }
    this._shownLayers.add(code);
    const renderable = this._layerService.getRenderableLayer(code);
    if (renderable) {
      this._events.next(new LayerShownEvent(renderable));
    }
    this.processSubLayersVisibility(code, true);
  }

  /**
   * Hides the objects of the specified layer.
   *
   * @param code the code of the layer to hide the objects for.
   */
  public hideLayer(code: string): void {
    const layer = this._layerService.getModel(code);
    if (!layer) {
      return;
    }
    this._shownLayers.delete(code);
    const renderable = this._layerService.getRenderableLayer(code);
    if (renderable) {
      this._events.next(new LayerHiddenEvent(renderable));
    }
    this.processSubLayersVisibility(code, false);
  }

  private processSubLayersVisibility(layer: string, visible: boolean): void {
    const model = this._layerService.getModel(layer);
    if (model?.subLayers) {
      model.subLayers
        .forEach(
          (subLayer: Layer) => {
            if (visible) {
              this.showLayer(subLayer.code);
            } else {
              this.hideLayer(subLayer.code);
            }
          }
        );
    }
  }

}
