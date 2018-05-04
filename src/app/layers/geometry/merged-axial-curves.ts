import { Vector3, LineSegments, BufferGeometry, Object3D } from 'three';
import { AxialCurveCalculator } from './axial-curve-calculator';
import { MergedObjects } from './merged-objects';

export class MergedAxialCurves extends MergedObjects<LineSegments> {

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
