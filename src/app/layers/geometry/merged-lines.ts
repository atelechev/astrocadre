import { Vector3, LineSegments, BufferGeometry, Object3D } from 'three';
import { toVector3 } from '../../core/layer/vector-utils';
import { MergedObjects } from './merged-objects';

export class MergedLines extends MergedObjects<LineSegments> {

  constructor(segments: number[][],
              radius: number) {
    super(segments, radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    const p0 = toVector3(segment[0], segment[1], this.radius);
    const p1 = toVector3(segment[2], segment[3], this.radius);
    return [ p0, p1 ];
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

}
