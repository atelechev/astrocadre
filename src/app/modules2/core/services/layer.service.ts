import { Injectable } from '@angular/core';
import { Layer } from 'src/app/modules2/core/models/layer';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';

@Injectable()
export class LayerService {

  private _rootLayer: Layer;

  private readonly _allLayers: Map<string, Layer>;

  constructor(
    private readonly _dataService: StaticDataService,
    private readonly _eventsService: EventsService
  ) {
    this._rootLayer = undefined;
    this._allLayers = new Map<string, Layer>();
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
    return this._allLayers.get(code);
  }

  private processLoadedLayer(layer: Layer): void {
    if (!layer) {
      return;
    }
    this._allLayers.set(layer.code, layer);
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
            this.fireLayerLoaded(layer);
          }
        );
    } else {
      this.fireLayerLoaded(layer);
    }
  }

  private fireLayerLoaded(layer: Layer): void {
    this._eventsService.fireLayerLoaded(layer);
  }

}
