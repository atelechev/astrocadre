import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, Material } from 'three';
import { Injectable, Component } from '@angular/core';
import { ConstellationBoundaryService } from './constellation-boundaries.service';
import { ConstellationBoundary } from './model/constellation-boundary';
import { Http } from '@angular/Http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BoundarySegment } from './model/boundary-segment';
import { MergedAxialCurves } from './model/merged-axial-curves';

@Component({
  template: ``,
  providers: [
    ConstellationBoundaryService
  ]
})
export class ConstellationBoundariesComponent implements RenderableLayer {

  private material: Material;

  constructor(private constellationBoundaryService: ConstellationBoundaryService) {
    this.material = new LineBasicMaterial({ color : 0x5e56ef });
  }

  private toBoundarySegment(rawSegment: number[]): BoundarySegment {
    return new BoundarySegment(rawSegment[0], rawSegment[1], rawSegment[2], rawSegment[3]);
  }

  public getObjects(): Observable<Object3D[]> {
    return this.constellationBoundaryService.getConstellationBoundaries()
               .map((rawSegments: number[][]) => {
                  const mergedCurves = new MergedAxialCurves(this.material, rawSegments, 1.98);
                  return [ mergedCurves.toObject3D() ];
               });
  }

  public getName(): string {
    return 'constellation boundaries';
  }

}
