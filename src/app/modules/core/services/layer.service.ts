import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Stars } from '#core/models/layers/stars';
import { SupportedLayers } from '#core/models/supported-layers';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { ThemeService } from '#core/services/theme.service';
import { Theme } from '#core/models/theme';
import { RenderableText } from '#core/models/layers/renderable-text';

@Injectable()
export class LayerService {

  private readonly _layerShown: BehaviorSubject<RenderableLayer>;

  private readonly _layerHidden: BehaviorSubject<RenderableLayer>;

  private readonly _textsShown: BehaviorSubject<Array<RenderableText>>;

  private readonly _textsHidden: BehaviorSubject<Array<RenderableText>>;

  private _rootLayer: Layer;

  private readonly _layerModels: Map<string, Layer>;

  private readonly _renderableLayers: Map<string, RenderableLayer>;

  private readonly _shownLayers: Set<string>;

  constructor(
    private readonly _layersFactory: LayersFactoryService,
    private readonly _themeService: ThemeService
  ) {
    this._rootLayer = undefined;
    this._layerModels = new Map<string, Layer>();
    this._renderableLayers = new Map<string, RenderableLayer>();
    this._shownLayers = new Set<string>();
    this._layerShown = new BehaviorSubject<RenderableLayer>(undefined);
    this._layerHidden = new BehaviorSubject<RenderableLayer>(undefined);
    this._textsShown = new BehaviorSubject<Array<RenderableText>>([]);
    this._textsHidden = new BehaviorSubject<Array<RenderableText>>([]);
  }

  public get rootLayer(): Layer {
    return this._rootLayer;
  }

  public set rootLayer(layer: Layer) {
    this._rootLayer = layer;
  }

  public get layerShown(): Observable<RenderableLayer> {
    return this._layerShown;
  }

  public get layerHidden(): Observable<RenderableLayer> {
    return this._layerHidden;
  }

  public get textsShown(): Observable<Array<RenderableText>> {
    return this._textsShown;
  }

  public get textsHidden(): Observable<Array<RenderableText>> {
    return this._textsHidden;
  }

  public isShown(layer: string): boolean {
    return !!layer && this._shownLayers.has(layer);
  }

  public getRenderableLayer(code: string): RenderableLayer {
    return this._renderableLayers.get(code);
  }

  public showLayer(layer: string): void {
    this._shownLayers.add(layer);
    const renderable = this._renderableLayers.get(layer);
    if (renderable) {
      this._layerShown.next(renderable);
    }
    this.processSubLayersVisibility(layer, true);
  }

  public hideLayer(layer: string): void {
    this._shownLayers.delete(layer);
    const renderable = this._renderableLayers.get(layer);
    if (renderable) {
      this._layerHidden.next(renderable);
    }
    this.processSubLayersVisibility(layer, false);
  }

  public showStarLayersDownToMagnitude(magnitude: number): void {
    this.getAllStarsLayers().forEach(
      (layer: Stars) => {
        if (magnitude < layer.magnitudeClass) {
          this.hideLayer(layer.model.code);
        } else {
          this.showLayer(layer.model.code);
        }
      }
    );
  }

  public showTexts(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    layer.showTexts();
    this._textsShown.next(layer.texts);
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const renderable = this.getRenderableLayer(subLayer.code);
        this.showTexts(renderable);
      }
    );
  }

  public hideTexts(layer: RenderableLayer): void {
    if (!layer) {
      return;
    }
    layer.hideTexts();
    this._textsHidden.next(layer.texts);
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const renderable = this.getRenderableLayer(subLayer.code);
        this.hideTexts(renderable);
      }
    );
  }

  public showStarsProperNames(show: boolean): void {
    const layer = this.starsLayer;
    this.hideTexts(layer);
    this.toggleNamesType(layer, show);
    this.showTexts(layer);
  }

  public registerLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this.buildRenderable(layer);
    this._layerModels.set(layer.code, layer);
    this.showLayer(layer.code);
  }

  private toggleNamesType(layer: Stars, useProper: boolean): void {
    if (!layer) {
      return;
    }
    if (useProper) {
      layer.showProperNames();
    } else {
      layer.showStandardNames();
    }
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const starsSublayer = this.getRenderableLayer(subLayer.code) as Stars;
        this.toggleNamesType(starsSublayer, useProper);
      }
    );
  }

  private get starsLayer(): Stars {
    return this.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

  private getAllStarsLayers(): Array<Stars> {
    return this.starsLayer?.model?.subLayers?.map(
      (subLayer: Layer) => this.getRenderableLayer(subLayer.code) as Stars
    ).filter((starLayer: Stars) => !!starLayer) || [];
  }

  private buildRenderable(layer: Layer): RenderableLayer {
    const renderable = this._layersFactory.buildRenderableLayer(layer);
    if (renderable) {
      this._themeService.themeChanged
        .subscribe(
          (theme: Theme) => renderable.applyTheme(theme)
        );
      this._renderableLayers.set(layer.code, renderable);
    }
    return renderable;
  }

  private processSubLayersVisibility(layer: string, visible: boolean): void {
    const model = this._layerModels.get(layer);
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
