import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, EllipseCurve } from 'three';
import { Injectable, Component } from '@angular/core';
import { ConstellationBoundaryService } from './constellation-boundaries.service';
import { ConstellationBoundary } from './model/constellation-boundary';
import { Http } from '@angular/Http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BoundarySegment } from './model/boundary-segment';
import { CurveSegment } from './model/curve-segment';

@Component({
  template: ``,
  providers: [
    ConstellationBoundaryService
  ]
})
export class ConstellationBoundariesComponent implements RenderableLayer {

  constructor(private constellationBoundaryService: ConstellationBoundaryService) {

  }

  private toBoundarySegment(rawSegment: number[]): BoundarySegment {
    return new BoundarySegment(rawSegment[0], rawSegment[1], rawSegment[2], rawSegment[3]);
  }

  public getObjects(): Observable<Object3D[]> {
    return this.constellationBoundaryService.getConstellationBoundaries()
               .map((rawSegments: number[][]) => {
                  const allBoundaries = new CurveSegment(rawSegments).toObject3D();
                  return [ allBoundaries ];
               });
  }

  public getName(): string {
    return 'constellation boundaries';
  }

}
