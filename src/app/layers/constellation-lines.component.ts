import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineBasicMaterial, Material } from 'three';
import { Component } from '@angular/core';
import { StarsService } from './stars.service';
import { Observable } from 'rxjs/Observable';
import { MergedLines } from './model/merged-lines';

@Component({
  template: ``,
  providers: [
    StarsService
  ]
})
export class ConstellationLinesComponent implements RenderableLayer {

  private material: Material;

  constructor(private starsService: StarsService) {
    this.material = new LineBasicMaterial({ color : 0xff56ef });
  }

  public getObjects(): Observable<Object3D[]> {
    return this.starsService.getConstellationLines()
               .map((rawSegments: number[][]) => {
                  const mergedCurves = new MergedLines(this.material, rawSegments, 1.98);
                  return [ mergedCurves.toObject3D() ];
               });
  }

  public getName(): string {
    return 'constellation lines';
  }

}
