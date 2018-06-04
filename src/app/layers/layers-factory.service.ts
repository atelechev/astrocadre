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
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { LinesFactory } from './geometry/lines-factory';
import { PointsFactory } from './geometry/points-factory';
import { SkyGridLayerFactory } from './sky-grid-layer-factory';

@Injectable()
export class LayersFactoryService {

  constructor(private dataService: StaticDataService,
              private axialCurvesFactory: AxialCurvesFactory,
              private linesFactory: LinesFactory,
              private pointsFactory: PointsFactory,
              private skyGridLayerFactory: SkyGridLayerFactory) {

  }

  private initConstellationBoundariesLayer(layer: LayersTreeNode): Observable<RenderableLayer> {
    return this.dataService.getConstellationBoundaries().map(
      (rawBoundaries: number[][]) => new ConstellationBoundariesLayer(layer, rawBoundaries, this.axialCurvesFactory)
    );
  }

  private initConstellationLinesLayer(layer: LayersTreeNode): Observable<RenderableLayer> {
    return this.dataService.getConstellationLines().map(
      (rawSegments: number[][]) => new ConstellationLinesLayer(layer, rawSegments, this.linesFactory)
    );
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
      return Observable.of(new RenderableLayer(layer));
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
    switch (layer.code) {
      case Layers.SKY_GRID: {
        return this.skyGridLayerFactory.newLayer(layer, this.axialCurvesFactory);
      }
      case Layers.CONSTELLATIONS: {
        return Observable.of(new RenderableLayer(layer));
      }
      case Layers.CONSTELLATION_BOUNDARIES: {
        return this.initConstellationBoundariesLayer(layer);
      }
      case Layers.CONSTELLATION_LINES: {
        return this.initConstellationLinesLayer(layer);
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
