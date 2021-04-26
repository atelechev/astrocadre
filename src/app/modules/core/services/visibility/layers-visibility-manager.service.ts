import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

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
   * Sets the specified layer visible or hidden.
   *
   * @param code the code of the layer to show/hide.
   * @param visible true to show, false to hide.
   */
  public setVisible(code: string, visible: boolean): void {
    const renderable = this._layerService.getRenderableLayer(code);
    if (!renderable) {
      return;
    }
    if (visible) {
      this.showLayer(renderable);
    } else {
      this.hideLayer(renderable);
    }
  }

  private showLayer(layer: RenderableLayer): void {
    this._shownLayers.add(layer.code);
    this._events.next(new LayerShownEvent(layer));
    this.processSubLayersVisibility(layer, true);
  }

  private hideLayer(layer: RenderableLayer): void {
    this._shownLayers.delete(layer.code);
    this._events.next(new LayerHiddenEvent(layer));
    this.processSubLayersVisibility(layer, false);
  }

  private processSubLayersVisibility(layer: Layer, visible: boolean): void {
    if (layer?.subLayers) {
      layer.subLayers
        .forEach(
          (subLayer: Layer) => this.setVisible(subLayer.code, visible)
        );
    }
  }

}
