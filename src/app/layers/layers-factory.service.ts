import { Layers } from '../core/layers';
import { RenderableLayer } from '../core/renderable-layer';
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

@Injectable()
export class LayersFactoryService {

  constructor(private starsService: StarsService) {

  }

  private initConstellationBoundariesLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    return this.starsService.getConstellationBoundaries().map(
      (rawBoundaries: number[][]) => {
        return new ConstellationBoundariesLayer(layer, rawBoundaries);
      }
    );
  }

  private initConstellationLinesLayer(layer: ItemsTreeNode): Observable<RenderableLayer> {
    return this.starsService.getConstellationLines().map(
      (rawSegments: number[][]) => {
        return new ConstellationLinesLayer(layer, rawSegments);
      }
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
      (rawStars: number[][]) => new StarsMagnitudeLayer(layer, magClass, rawStars)
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
      default: {
        throw new Error(`Unsupported layer: ${layer}`);
      }
    }
  }

}
