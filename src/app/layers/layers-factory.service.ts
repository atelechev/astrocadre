import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { SkyGridLayer } from './sky-grid-layer';
import { StarsService } from './stars.service';
import { ConstellationBoundariesLayer } from './constellation-boundaries-layer';
import { ConstellationLinesLayer } from './constellation-lines-layer';
import { StarsLayer } from './stars-layer';
import { ConstellationsLayer } from './constellations-layer';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { ItemsTreeNode } from '../core/items-tree-node';
import { ConstellationNamesLayer } from './constellation-names-layer';
import { ConstellationMetadata } from './constellation-metadata';

@Injectable()
export class LayersFactoryService {

  constructor(private starsService: StarsService) {

  }

  private initConstellationBoundariesLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    return this.starsService.getConstellationBoundaries().map(
      (rawBoundaries: number[][]) => new ConstellationBoundariesLayer(layer, rawBoundaries)
    );
  }

  private initConstellationLinesLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    return this.starsService.getConstellationLines().map(
      (rawSegments: number[][]) => new ConstellationLinesLayer(layer, rawSegments)
    );
  }

  private initConstellationNamesLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    return this.starsService.getConstellationMetadata().map(
      (rawMetadata: ConstellationMetadata[]) => new ConstellationNamesLayer(layer, rawMetadata)
    );
  }

  private isStarLayer(layer: string): boolean {
    return layer && layer.startsWith(Layers.STARS);
  }

  private initStarLayers(layer: ItemsTreeNode): Observable<RenderableLayer> {
    if (layer.code === Layers.STARS) {
      return Observable.of(new StarsLayer(layer));
    }
    const magClass = parseFloat(layer.code.substr(Layers.STARS.length + '-mag'.length));
    return this.starsService.getStarsByMagnitudeClass(magClass).map(
      (rawStars: any[][]) => new StarsMagnitudeLayer(layer, magClass, rawStars)
    );
  }

  public newRenderableLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    if (this.isStarLayer(layer.code)) {
      return this.initStarLayers(layer);
    }
    switch (layer.code) {
      case Layers.SKY_GRID: {
        return Observable.of(new SkyGridLayer(layer));
      }
      case Layers.CONSTELLATIONS: {
        return Observable.of(new ConstellationsLayer(layer));
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
