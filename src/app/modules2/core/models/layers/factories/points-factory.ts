import { Object3DFactory } from 'src/app/modules2/core/models/layers/factories/object3d-factory';
import { toVector3 } from 'src/app/modules2/core/utils/vector-utils';
import { BufferGeometry, Points, Vector3 } from 'three';

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