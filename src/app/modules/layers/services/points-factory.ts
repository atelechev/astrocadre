import { Injectable } from '@angular/core';
import { BufferGeometry, Points, Vector3 } from 'three';
import { toVector3 } from '#core/utils/vector-utils';
import { Object3DFactory } from '#layers/services/object3d-factory';

@Injectable()
export class PointsFactory extends Object3DFactory<Points> {

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    if (!segment || segment.length < 2) {
      throw new Error(`invalid point definition: \'${segment}\'`);
    }
    const p0 = toVector3(segment[0], segment[1], radius);
    return [p0];
  }

  protected toTargetObject3D(geometry: BufferGeometry): Points {
    return new Points(geometry);
  }

}
