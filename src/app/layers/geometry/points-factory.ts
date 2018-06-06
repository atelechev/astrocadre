import { Vector3, Points, BufferGeometry } from 'three';
import { toVector3 } from '../../core/layer/vector-utils';
import { Object3DFactory } from './object3d-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class PointsFactory extends Object3DFactory<Points> {

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    if (!segment || segment.length < 2) {
      throw new Error(`invalid point definition: \'${segment}\'`);
    }
    const p0 = toVector3(segment[0], segment[1], radius);
    return [ p0 ];
  }

  protected toTargetObject3D(geometry: BufferGeometry): Points {
    return new Points(geometry);
  }

}
