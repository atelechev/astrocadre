import { Vector3, Math as ThreeMath } from 'three';


export class AxialCurveCalculator {

  private squareRadius: number;

  private intermediatePointsDensity: number; // the bigger the less dense!

  constructor(private radius: number) {
    this.squareRadius = this.radius * this.radius;
    this.intermediatePointsDensity = 5.0;
  }

  private calculateAxisPointsBetween(varAxis0: number,
                                     varAxis1: number,
                                     constAxis: number,
                                     directionMultiplier: number,
                                     toVectorFunct: (varAxis: number, constAxis: number) => Vector3): Vector3[] {
    const points = new Array<Vector3>();
    const range = Math.abs(varAxis0 - varAxis1);
    const nbPoints = Math.floor(range / this.intermediatePointsDensity);
    const step = range / (nbPoints + 1); // + 1 in case of 1 intermediate point only
    for (let i = 1; i <= nbPoints; i++) {
      const varAxisCoord = varAxis0 + i * step * directionMultiplier;
      points.push(toVectorFunct(varAxisCoord, constAxis));
    }
    return points;
  }

  private isMeridionalSegment(segment: number[]): boolean {
    const ra0 = segment[0];
    const ra1 = segment[2];
    return ra0 === ra1 || (ra0 === 360 && ra1 === 0) || (ra0 === 0 && ra1 === 360);
  }

  private isParallelSegment(segment: number[]): boolean {
    const decl0 = segment[1];
    const decl1 = segment[3];
    return decl0 === decl1;
  }

  private toVector3(ra: number, decl: number): Vector3 {
    const zCoord = this.radius * decl / 90;
    const radiusAtDecl = Math.sqrt(this.squareRadius - zCoord * zCoord);
    return new Vector3(
      -radiusAtDecl * Math.sin(ThreeMath.degToRad(ra)), // negative X to mirror for internal view
      radiusAtDecl * Math.cos(ThreeMath.degToRad(ra)),
      zCoord
    );
  }

  private getDirectionMultiplier(start: number, end: number): number {
    if (start <= end) {
      return 1;
    }
    return -1;
  }

  private calculateIntermediatePoints(segment: number[]): Vector3[] {
    const ra0 = segment[0];
    const ra1 = segment[2];
    const decl0 = segment[1];
    const decl1 = segment[3];

    if (this.isParallelSegment(segment)) {
      const toVectorFunct = (v, c) => this.toVector3(v, c);
      const dirMultipl = this.getDirectionMultiplier(ra0, ra1);
      return this.calculateAxisPointsBetween(ra0, ra1, decl0, dirMultipl, toVectorFunct);
    }
    if (this.isMeridionalSegment(segment)) {
      const toVectorFunct = (v, c) => this.toVector3(c, v);
      const dirMultipl = this.getDirectionMultiplier(decl0, decl1);
      return this.calculateAxisPointsBetween(decl0, decl1, ra0, dirMultipl, toVectorFunct);
    }
    console.warn(`Skipping intermediate points for unexpected segment: ${segment}`);
    return [];
  }

  public calculateVertices(curveStartEnd: number[]): Vector3[] {
    const intermediatePoints = this.calculateIntermediatePoints(curveStartEnd);
    const pairsForSegment = new Array<Vector3>();
    pairsForSegment.push(this.toVector3(curveStartEnd[0], curveStartEnd[1]));
    intermediatePoints.forEach(point => {
      pairsForSegment.push(point);
      pairsForSegment.push(point);
    });
    pairsForSegment.push(this.toVector3(curveStartEnd[2], curveStartEnd[3]));
    return pairsForSegment;
  }

}
