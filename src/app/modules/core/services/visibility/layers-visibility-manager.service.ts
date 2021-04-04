import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerService } from '#core/services/layer.service';
import { Layer } from '#core/models/layers/layer';

@Injectable()
export class LayersVisibilityManagerService {

  private readonly _layerShown: BehaviorSubject<RenderableLayer>;

  private readonly _layerHidden: BehaviorSubject<RenderableLayer>;

  private readonly _shownLayers: Set<string>;

  constructor(
    private readonly _layerService: LayerService
  ) {
    this._shownLayers = new Set<string>();
    this._layerShown = new BehaviorSubject<RenderableLayer>(undefined);
    this._layerHidden = new BehaviorSubject<RenderableLayer>(undefined);
  }

  public get layerShown(): Observable<RenderableLayer> {
    return this._layerShown;
  }

  public get layerHidden(): Observable<RenderableLayer> {
    return this._layerHidden;
  }

  public isShown(code: string): boolean {
    return !!code && this._shownLayers.has(code);
  }

  public showLayer(code: string): void {
    const layer = this._layerService.getModel(code);
    if (!layer) {
      return;
    }
    this._shownLayers.add(code);
    const renderable = this._layerService.getRenderableLayer(code);
    if (renderable) {
      this._layerShown.next(renderable);
    }
    this.processSubLayersVisibility(code, true);
  }

  public hideLayer(code: string): void {
    const layer = this._layerService.getModel(code);
    if (!layer) {
      return;
    }
    this._shownLayers.delete(code);
    const renderable = this._layerService.getRenderableLayer(code);
    if (renderable) {
      this._layerHidden.next(renderable);
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
