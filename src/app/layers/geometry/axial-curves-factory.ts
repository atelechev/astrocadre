import { Vector3, LineSegments, BufferGeometry, Object3D } from 'three';
import { AxialCurveCalculator } from './axial-curve-calculator';
import { Object3DFactory } from './object3d-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class AxialCurvesFactory extends Object3DFactory<LineSegments> {

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    return new AxialCurveCalculator(radius).calculateVertices(segment); // TODO improve ACC
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

}
