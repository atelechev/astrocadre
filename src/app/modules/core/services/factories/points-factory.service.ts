import { Injectable } from '@angular/core';
import { BufferGeometry, Points, Vector3 } from 'three';
import { Object3DFactory } from '#core/models/layers/object3d-factory';
import { toVector3 } from '#core/utils/vector-utils';

/**
 * Factory object allowing to transform source coordinates data into 3D points data.
 */
@Injectable()
export class PointsFactoryService extends Object3DFactory<Points> {

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