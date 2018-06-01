import { Vector3, LineSegments, BufferGeometry, Object3D } from 'three';
import { AxialCurveCalculator } from './axial-curve-calculator';
import { Object3DFactory } from './object3d-factory';

export class AxialCurvesFactory extends Object3DFactory<LineSegments> {

  private axialCurveCalculator: AxialCurveCalculator;

  constructor(segments: number[][],
              radius: number) {
    super(segments, radius);
    this.axialCurveCalculator = new AxialCurveCalculator(radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    return this.axialCurveCalculator.calculateVertices(segment);
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

}
