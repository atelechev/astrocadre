import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineBasicMaterial, Material } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedAxialCurves } from './model/merged-axial-curves';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class ConstellationBoundariesComponent implements RenderableLayer {

  private material: Material;

  constructor(private starsService: StarsService) {
    this.material = new LineBasicMaterial({ color : 0x5e56ef });
  }

  public getObjects(): Observable<Object3D[]> {
    return this.starsService.getConstellationBoundaries()
               .map((rawSegments: number[][]) => {
                  const mergedCurves = new MergedAxialCurves(this.material, rawSegments, 1.98);
                  return [ mergedCurves.toObject3D() ];
               });
  }

  public getName(): string {
    return 'constellation boundaries';
  }

}
