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

@Injectable()
export class LayersFactoryService {

  constructor(private starsService: StarsService) {

  }

  private initConstellationBoundariesLayer(): Observable<RenderableLayer> {
    return this.starsService.getConstellationBoundaries().map(
      (rawBoundaries: number[][]) => {
        return new ConstellationBoundariesLayer(rawBoundaries);
      }
    );
  }

  private initConstellationLinesLayer(): Observable<RenderableLayer> {
    return this.starsService.getConstellationLines().map(
      (rawSegments: number[][]) => {
        return new ConstellationLinesLayer(rawSegments);
      }
    );
  }

  private initStarsLayer(): Observable<RenderableLayer> {
    return this.starsService.getStarsByClasses().map(
      (rawStarsByClasses: Map<number, number[][]>) => {
        return new StarsLayer(rawStarsByClasses);
      }
    );
  }

  public newRenderableLayer(layer: string): Observable<RenderableLayer> {
    switch (layer) {
      case Layers.SKY_GRID: {
        return Observable.of(new SkyGridLayer());
      }
      case Layers.CONSTELLATION_BOUNDARIES: {
        return this.initConstellationBoundariesLayer();
      }
      case Layers.CONSTELLATION_LINES: {
        return this.initConstellationLinesLayer();
      }
      case Layers.STARS: {
        return this.initStarsLayer();
      }
      default: {
        throw new Error(`Unsupported layer: ${layer}`);
      }
    }
  }

}
