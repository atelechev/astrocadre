import { BufferGeometry, LineDashedMaterial, LineBasicMaterial } from 'three';
import { LineSegments, Vector3, Object3D, Material } from 'three';


export abstract class MergedObjects {

  constructor(private material: Material,
              private segments: number[][],
              protected radius: number) {

  }

  protected abstract segmentToVertices(segment: number[]): Vector3[];

  public toObject3D(): Object3D {
    const geometry = new BufferGeometry();
    let pointPairs = new Array<Vector3>();
    this.segments.forEach(segment => {
      const vertices = this.segmentToVertices(segment);
      pointPairs = pointPairs.concat(vertices);
    });
    geometry.setFromPoints(pointPairs);
    // no constructor arg with abstract type, so we have to check it
    if (this.material instanceof LineDashedMaterial) {
      return new LineSegments(geometry, <LineDashedMaterial> this.material);
    }
    return new LineSegments(geometry, <LineBasicMaterial> this.material);
  }

}
