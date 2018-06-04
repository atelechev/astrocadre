import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { SkyGridLayer } from './sky-grid-layer';
import { StaticDataService } from '../core/static-data-service';
import { ConstellationBoundariesLayer } from './constellation-boundaries-layer';
import { ConstellationLinesLayer } from './constellation-lines-layer';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { ConstellationNamesLayer } from './constellation-names-layer';
import { ConstellationMetadata } from '../core/layer/constellation-metadata';
import { PointsFactory } from './geometry/points-factory';
import { SkyGridLayerFactory } from './sky-grid-layer-factory';
import { RenderableLayerFactory } from './renderable-layer-factory';
import { ConstellationBoundariesLayerFactory } from './constellation-boundaries-layer-factory';
import { ConstellationLinesLayerFactory } from './constellation-lines-layer-factory';

@Injectable()
export class LayersFactoryService {

  // TODO remove geometry factories args, leave only layers factories
  constructor(private dataService: StaticDataService,
              private pointsFactory: PointsFactory,
              private renderableLayerFactory: RenderableLayerFactory,
              private skyGridLayerFactory: SkyGridLayerFactory,
              private constellationBoundariesLayerFactory: ConstellationBoundariesLayerFactory,
              private constellationLinesLayerFactory: ConstellationLinesLayerFactory) {

  }

  private initConstellationNamesLayer(layer: LayersTreeNode): Observable<RenderableLayer> {
    return this.dataService.getConstellationsMetadata().map(
      (rawMetadata: ConstellationMetadata[]) => new ConstellationNamesLayer(layer, rawMetadata)
    );
  }

  private isStarLayer(layer: string): boolean {
    return layer && layer.startsWith(Layers.STARS);
  }

  private initStarLayers(layer: LayersTreeNode): Observable<RenderableLayer> {
    if (layer.code === Layers.STARS) {
      return this.renderableLayerFactory.newLayer(layer);
    }
    const magClass = parseFloat(layer.code.substr(Layers.STARS.length + '-mag'.length));
    return this.dataService.getStarsByMagnitudeClass(magClass).map(
      (rawStars: any[][]) => new StarsMagnitudeLayer(layer, magClass, rawStars, this.pointsFactory)
    );
  }

  public newRenderableLayer(layer: LayersTreeNode): Observable<RenderableLayer> {
    if (this.isStarLayer(layer.code)) {
      return this.initStarLayers(layer);
    }
    // TODO represent factories as MAP
    switch (layer.code) {
      case Layers.SKY_GRID: {
        return this.skyGridLayerFactory.newLayer(layer);
      }
      case Layers.CONSTELLATIONS: {
        return this.renderableLayerFactory.newLayer(layer);
      }
      case Layers.CONSTELLATION_BOUNDARIES: {
        return this.constellationBoundariesLayerFactory.newLayer(layer);
      }
      case Layers.CONSTELLATION_LINES: {
        return this.constellationLinesLayerFactory.newLayer(layer);
      }
      case Layers.CONSTELLATION_NAMES: {
        return this.initConstellationNamesLayer(layer);
      }
      default: {
        throw new Error(`Unsupported layer: ${layer.code}`);
      }
    }
  }

}
