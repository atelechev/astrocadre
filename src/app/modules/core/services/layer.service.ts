import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { ThemeService } from '#core/services/theme.service';
import { ThemeEvent } from '#core/models/event/theme-event';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { Theme } from '#core/models/theme/theme';

/**
 * Holds the information of the current layers tree and
 * provides the accessors to the layers.
 */
@Injectable({ providedIn: 'root' })
export class LayerService {

  private readonly _events: BehaviorSubject<LayerEvent<any>>;

  private readonly _shownLayers: Set<string>;

  private readonly _layers: Map<string, RenderableLayer>;

  private readonly _drawIndices: Map<string, number>;

  constructor(private readonly _themeService: ThemeService) {
    this._shownLayers = new Set<string>();
    this._events = new BehaviorSubject<LayerEvent<any>>(LayerEvent.INITIAL);
    this._layers = new Map<string, RenderableLayer>();
    this._drawIndices = new Map<string, number>();
  }

  /**
   * Returns the renderable layer having the specified code.
   *
   * @param code the code of the layer to retrieve.
   * @returns RenderableLayer the layer ref.
   */
  public getRenderableLayer(code: string): RenderableLayer {
    return this._layers.get(code);
  }

  /**
   * Registers the specified layer among the known layers and
   * triggers the building of the corresponding renderable.
   *
   * @param layer the layer object to register.
   * @param index the index to associate the layer with. Must be unique.
   */
  public registerLayer(layer: RenderableLayer, index: number): void {
    if (!layer) {
      return;
    }
    this.ensureIndexDefinedAndUnique(index);
    this._themeService.events
      .subscribe(
        (event: ThemeEvent<any>) => {
          const theme = event.data;
          layer.applyTheme(theme);
          this.setLayerVisibilityFromTheme(layer, theme);
        }
      );
    this._layers.set(layer.code, layer);
    this._drawIndices.set(layer.code, index);
  }

  /**
   * Returns the index of the layer with the given code, that this
   * layer has in the list of all available layers.
   *
   * The value of this index affects the distance at which the objects
   * of this layer are drawn on the virtual sphere.
   *
   * @param code the code of the layer to retrieve the index for.
   * @returns number the index of the layer or -1 if it was not found.
   */
  public getIndex(code: string): number {
    return this._drawIndices.get(code) || -1;
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
    const renderable = this.getRenderableLayer(code);
    if (!renderable) {
      return;
    }
    if (visible) {
      this.showLayer(renderable);
    } else {
      this.hideLayer(renderable);
    }
  }

  /**
   * Returns the number of the layers that are registered in this service.
   */
  public get layersCount(): number {
    return this._layers.size;
  }

  private ensureIndexDefinedAndUnique(index: number): void {
    if (!index && index !== 0) {
      throw new Error('The layer index must be 0 or greater.');
    }
    const existingIndices = new Set<number>(Array.from(this._drawIndices.values()));
    if (existingIndices.has(index)) {
      throw new Error(`The layer index ${index} is already allocated!`);
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

  private processSubLayersVisibility(layer: RenderableLayer, visible: boolean): void {
    layer.subLayers
      .forEach(
        (code: string) => this.setVisible(code, visible)
      );
  }

  private setLayerVisibilityFromTheme(layer: RenderableLayer, theme: Theme): void {
    const style = layer.extractStyle(theme);
    const visible = !!(style && style.visibleOnLoad);
    this.setVisible(layer.code, visible);
  }

}
