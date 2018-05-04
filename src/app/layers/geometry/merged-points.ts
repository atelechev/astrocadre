import { Vector3, Points, BufferGeometry, Object3D } from 'three';
import { VectorUtil } from './vector-util';
import { MergedObjects } from './merged-objects';

export class MergedPoints extends MergedObjects<Points> {

  constructor(segments: number[][],
              radius: number) {
    super(segments, radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    const p0 = VectorUtil.toVector3(segment[0], segment[1], this.radius);
    return [ p0 ];
  }

  protected toTargetObject3D(geometry: BufferGeometry): Points {
    return new Points(geometry);
  }

}
