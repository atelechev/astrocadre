import { LineSegments, Vector3, Object3D, Math as ThreeMath, Material } from 'three';
import { BufferGeometry, ParametricGeometry, LineDashedMaterial, LineBasicMaterial } from 'three';
import { AxialCurveCalculator } from './axial-curve-calculator';

export class MergedAxialCurves {

  private axialCurveCalculator: AxialCurveCalculator;

  constructor(private material: Material,
              private segments: number[][],
              private radius: number) {
    this.axialCurveCalculator = new AxialCurveCalculator(radius);
  }

  public toObject3D(): Object3D {
    const geometry = new BufferGeometry();
    let pointPairs = new Array<Vector3>();
    this.segments.forEach(segment => {
      const vertices = this.axialCurveCalculator.calculateVertices(segment);
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
