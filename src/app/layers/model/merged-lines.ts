
import { Vector3, Material } from 'three';
import { VectorUtil } from './vector-util';
import { MergedObjects } from './merged-objects';

export class MergedLines extends MergedObjects {

  constructor(material: Material,
              segments: number[][],
              radius: number) {
    super(material, segments, radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    const p0 = VectorUtil.toVector3(segment[0], segment[1], this.radius);
    const p1 = VectorUtil.toVector3(segment[2], segment[3], this.radius);
    return [ p0, p1 ];
  }

}
