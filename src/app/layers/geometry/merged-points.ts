import { Vector3, Points, BufferGeometry, Object3D } from 'three';
import { toVector3 } from '../../core/layer/vector-utils';
import { MergedObjects } from './merged-objects';

export class MergedPoints extends MergedObjects<Points> {

  constructor(segments: number[][],
              radius: number) {
    super(segments, radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    if (!segment || segment.length < 2) {
      throw new Error(`invalid point definition: \'${segment}\'`);
    }
    const p0 = toVector3(segment[0], segment[1], this.radius);
    return [ p0 ];
  }

  protected toTargetObject3D(geometry: BufferGeometry): Points {
    return new Points(geometry);
  }

}
