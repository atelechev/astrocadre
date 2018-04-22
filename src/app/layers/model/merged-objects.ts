import { BufferGeometry, LineDashedMaterial, LineBasicMaterial, Geometry } from 'three';
import { LineSegments, Vector3, Object3D, Material } from 'three';


export abstract class MergedObjects {

  constructor(protected material: Material,
              private segments: number[][],
              protected radius: number) {

  }

  protected abstract segmentToVertices(segment: number[]): Vector3[];

  protected asObject3D(geometry: BufferGeometry): Object3D {
    // no constructor arg with abstract type, so we have to check it
    if (this.material instanceof LineDashedMaterial) {
      return new LineSegments(geometry, <LineDashedMaterial> this.material);
    }
    return new LineSegments(geometry, <LineBasicMaterial> this.material);
  }

  public toObject3D(): Object3D {
    const geometry = new BufferGeometry();
    let pointPairs = new Array<Vector3>();
    this.segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    return this.asObject3D(geometry);
  }

}
