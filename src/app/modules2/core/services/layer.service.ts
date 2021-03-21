import { Injectable } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayersFactoryService } from 'src/app/modules2/core/services/layers-factory.service';
import { SearchService } from 'src/app/modules2/core/services/search.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';

@Injectable()
export class LayerService {

  private _rootLayer: Layer;

  private readonly _layerModels: Map<string, Layer>;

  private readonly _renderableLayers: Map<string, RenderableLayer>;

  private readonly _shownLayers: Set<string>;

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _eventsService: EventsService,
    private readonly _layersFactory: LayersFactoryService,
    private readonly _searchService: SearchService
  ) {
    this._rootLayer = undefined;
    this._layerModels = new Map<string, Layer>();
    this._renderableLayers = new Map<string, RenderableLayer>();
    this._shownLayers = new Set<string>();
  }

  public get rootLayer(): Layer {
    return this._rootLayer;
  }

  public isShown(layer: string): boolean {
    return layer && this._shownLayers.has(layer);
  }

  public toggleLayerShown(layer: string): void {
    if (!layer) {
      return;
    }
    if (this._shownLayers.has(layer)) {
      this.hideLayer(layer);
    } else {
      this.showLayer(layer);
    }
  }

  public loadLayers(): void {
    this._dataService
      .getLayersTree()
      .subscribe(
        (root: Layer) => {
          this._rootLayer = root;
          this.processLoadedLayer(this._rootLayer);
        }
      );
  }

  public getLayer(code: string): Layer {
    return this._layerModels.get(code);
  }

  public getRenderableLayer(code: string): RenderableLayer {
    return this._renderableLayers.get(code);
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
    this._eventsService.fireTextsShown(layer); // TODO call showLayer directly, no need to use the events
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
    this._eventsService.fireTextsHidden(layer);
    layer.model.subLayers?.forEach(
      (subLayer: Layer) => {
        const renderable = this.getRenderableLayer(subLayer.code);
        this.hideTexts(renderable);
      }
    );
  }

  public toggleNamesType(layer: Stars, useProper: boolean): void {
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

  public showStarsProperNames(show: boolean): void {
    const layer = this.starsLayer;
    this.hideTexts(layer);
    this.toggleNamesType(layer, show);
    this.showTexts(layer);
  }

  public showLayer(layer: string): void {
    this._shownLayers.add(layer);
    const renderable = this._renderableLayers.get(layer);
    if (renderable) {
      this._eventsService.fireLayerShown(renderable);
    }
    this.processSubLayersVisibility(layer, true);
  }

  public hideLayer(layer: string): void {
    this._shownLayers.delete(layer);
    const renderable = this._renderableLayers.get(layer);
    if (renderable) {
      this._eventsService.fireLayerHidden(renderable);
    }
    this.processSubLayersVisibility(layer, false);
  }

  private get starsLayer(): Stars {
    return this.getRenderableLayer(SupportedLayers.STARS) as Stars;
  }

  private getAllStarsLayers(): Array<Stars> {
    return this.starsLayer.model.subLayers?.map(
      (subLayer: Layer) => this.getRenderableLayer(subLayer.code) as Stars
    ) || [];
  }

  private processLoadedLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this._layerModels.set(layer.code, layer);
    this.showLayer(layer.code);
    this.loadLayerObjects(layer);
    layer.subLayers?.forEach(
      (subLayer: Layer) => this.processLoadedLayer(subLayer)
    );
  }

  private loadLayerObjects(layer: Layer): void {
    if (layer.loadFromUrl) {
      this._dataService
        .getDataJson(layer.code)
        .toPromise()
        .then(
          (objs: Array<any>) => {
            layer.objects = objs || [];
            this.buildRenderable(layer);
          }
        );
    } else {
      this.buildRenderable(layer);
    }
  }

  private buildRenderable(layer: Layer): void {
    const renderable = this._layersFactory.buildRenderableLayer(layer);
    if (renderable) {
      this._renderableLayers.set(layer.code, renderable);
      this._searchService.registerSearchables(renderable.searchables);
      this._eventsService.fireLayerShown(renderable);
    }
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
