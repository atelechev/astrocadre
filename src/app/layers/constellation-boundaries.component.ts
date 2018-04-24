import { RenderableLayer } from '../core/renderable-layer';
import { Object3D } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedAxialCurves } from './model/merged-axial-curves';
import { Layers } from './layers';
import { Theme } from '../themes/theme';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class ConstellationBoundariesComponent implements RenderableLayer {

  constructor(private starsService: StarsService) {

  }

  public getObjects(theme: Theme): Observable<Object3D[]> {
    const material = theme.getMaterialForLayer(Layers.CONSTELLATION_BOUNDARIES, 'line-common');
    return this.starsService.getConstellationBoundaries()
               .map((rawSegments: number[][]) => {
                  const mergedCurves = new MergedAxialCurves(material, rawSegments, 1.98);
                  return [ mergedCurves.toObject3D() ];
               });
  }

  public getName(): string {
    return Layers.CONSTELLATION_BOUNDARIES;
  }

}
