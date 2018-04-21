import { Vector3, Material } from 'three';
import { AxialCurveCalculator } from './axial-curve-calculator';
import { MergedObjects } from './merged-objects';

export class MergedAxialCurves extends MergedObjects {

  private axialCurveCalculator: AxialCurveCalculator;

  constructor(material: Material,
              segments: number[][],
              radius: number) {
    super(material, segments, radius);
    this.axialCurveCalculator = new AxialCurveCalculator(radius);
  }

  protected segmentToVertices(segment: number[]): Vector3[] {
    return this.axialCurveCalculator.calculateVertices(segment);
  }

}
