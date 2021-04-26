import { Injectable } from '@angular/core';
import { BufferGeometry, LineSegments, Vector3 } from 'three';
import { Object3DFactory } from '#core/models/layers/object3d-factory';
import { isCrossingInitialMeridian, isMeridionalSegment, isParallelSegment } from '#core/utils/segment-utils';
import { toVector3 } from '#core/utils/vector-utils';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';

/**
 * Factory for the curves situated on the 3D world sphere.
 */
@Injectable({ providedIn: 'root' })
export class AxialCurvesFactoryService extends Object3DFactory<LineSegments> {

  private readonly _intermediatePointsDensity = 5.0; // the bigger the less dense, but uglier in the view!

  constructor(virtualSphereService: VirtualSphereRadiusService) {
    super(virtualSphereService);
  }

  protected segmentToVertices(segment: number[], radius: number): Vector3[] {
    if (isCrossingInitialMeridian(segment)) {
      return [];
    }
    const intermediatePoints = this.calculateIntermediatePoints(segment, radius);
    const pairsForSegment = new Array<Vector3>();
    pairsForSegment.push(toVector3(segment[0], segment[1], radius));
    intermediatePoints.forEach(point => {
      pairsForSegment.push(point);
      pairsForSegment.push(point);
    });
    pairsForSegment.push(toVector3(segment[2], segment[3], radius));
    return pairsForSegment;
  }

  protected toTargetObject3D(geometry: BufferGeometry): LineSegments {
    return new LineSegments(geometry);
  }

  private calculateAxisPointsBetween(varAxis0: number,
    varAxis1: number,
    constAxis: number,
    directionMultiplier: number,
    toVectorFunct: (vAxis: number, cAxis: number) => Vector3): Vector3[] {
    const points = new Array<Vector3>();
    const range = Math.abs(varAxis0 - varAxis1);
    const nbPoints = Math.floor(range / this._intermediatePointsDensity);
    const step = range / (nbPoints + 1); // + 1 in case of 1 intermediate point only
    for (let i = 1; i <= nbPoints; i++) {
      const varAxisCoord = varAxis0 + i * step * directionMultiplier;
      points.push(toVectorFunct(varAxisCoord, constAxis));
    }
    return points;
  }

  private getDirectionMultiplier(start: number, end: number): number {
    if (start <= end) {
      return 1;
    }
    return -1;
  }

  private calculateIntermediatePoints(segment: number[], radius: number): Vector3[] {
    const ra0 = segment[0];
    const ra1 = segment[2];
    const decl0 = segment[1];
    const decl1 = segment[3];

    if (isParallelSegment(segment)) {
      const toVectorFunct = (v, c) => toVector3(v, c, radius);
      const dirMultipl = this.getDirectionMultiplier(ra0, ra1);
      return this.calculateAxisPointsBetween(ra0, ra1, decl0, dirMultipl, toVectorFunct);
    }
    if (isMeridionalSegment(segment)) {
      const toVectorFunct = (v, c) => toVector3(c, v, radius);
      const dirMultipl = this.getDirectionMultiplier(decl0, decl1);
      return this.calculateAxisPointsBetween(decl0, decl1, ra0, dirMultipl, toVectorFunct);
    }
    return [];
  }

}
