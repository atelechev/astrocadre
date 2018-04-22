import { Vector3, Material, Points, BufferGeometry, Object3D } from 'three';
import { VectorUtil } from './vector-util';
import { MergedObjects } from './merged-objects';

export class MergedPoints extends MergedObjects {

  constructor(material: Material,
              segments: number[][],
              radius: number) {
    super(material, segments, radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    const p0 = VectorUtil.toVector3(segment[0], segment[1], this.radius);
    return [ p0 ];
  }

  protected asObject3D(geometry: BufferGeometry): Object3D {
    return new Points(geometry, this.material);
  }

}
