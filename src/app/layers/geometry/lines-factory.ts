import { Injectable } from '@angular/core';
import { BufferGeometry, LineSegments, Vector3 } from 'three';
import { Object3DFactory } from '#layers/geometry/object3d-factory';
import { toVector3 } from '#core-layer/vector-utils';

@Injectable()
export class LinesFactory extends Object3DFactory<LineSegments> {

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    const p0 = toVector3(segment[0], segment[1], radius);
    const p1 = toVector3(segment[2], segment[3], radius);
    return [p0, p1];
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

}
