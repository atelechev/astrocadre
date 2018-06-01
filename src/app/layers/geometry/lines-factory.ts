import { Vector3, LineSegments, BufferGeometry, Object3D } from 'three';
import { toVector3 } from '../../core/layer/vector-utils';
import { Object3DFactory } from './object3d-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class LinesFactory extends Object3DFactory<LineSegments> {

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    const p0 = toVector3(segment[0], segment[1], radius);
    const p1 = toVector3(segment[2], segment[3], radius);
    return [ p0, p1 ];
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

}
