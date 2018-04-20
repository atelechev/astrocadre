import { LineSegments, Vector3, Object3D, Math as ThreeMath, LineBasicMaterial, BufferGeometry, ParametricGeometry } from 'three';


export class CurveSegment {

  private radius = 2; // TODO

  private intermediatePointsDensity = 5; // the bigger the less dense!

  private material = new LineBasicMaterial({ color : 0xff00ff });

  constructor(private segments: number[][]) {

  }

  private calculateAxisPointsBetween(varAxis0: number,
                                     varAxis1: number,
                                     constAxis: number,
                                     toVectorFunct: (varAxis: number, constAxis: number) => Vector3): Vector3[] {
    const points = new Array<Vector3>();
    const range = Math.abs(varAxis0 - varAxis1);
    const minAxis = Math.min(varAxis0, varAxis1);
    const nbPoints = Math.floor(range / this.intermediatePointsDensity);
    const step = range / nbPoints;
    for (let i = 1; i < nbPoints; i++) {
      const varAxisCoord = minAxis + i * step;
      points.push(toVectorFunct(varAxisCoord, constAxis));
    }
    return points;
  }

  private toVector3(ra: number, decl: number): Vector3 {
    const zCoord = this.radius * decl / 90;
    const radiusAtDecl = Math.sqrt(this.radius * this.radius - zCoord * zCoord);
    return new Vector3(
      -radiusAtDecl * Math.sin(ThreeMath.degToRad(ra)), // negative X to mirror for internal view
      radiusAtDecl * Math.cos(ThreeMath.degToRad(ra)),
      zCoord
    );
  }

  private calculateSegment(segment: number[]): Vector3[] {
    const startEndOrdered = this.determineStartEndPoints(segment);
    const ra0 = startEndOrdered[0];
    const decl0 = startEndOrdered[1];
    const ra1 = startEndOrdered[2];
    const decl1 = startEndOrdered[3];
    const intermediatePoints = this.calculateIntermediatePoints(startEndOrdered);
    const pairsForSegment = new Array<Vector3>();
    pairsForSegment.push(this.toVector3(ra0, decl0));
    intermediatePoints.forEach(point => {
      pairsForSegment.push(point);
      pairsForSegment.push(point);
    });
    pairsForSegment.push(this.toVector3(ra1, decl1));
    return pairsForSegment;
  }

  private determineStartEndPoints(segment: number[]): number[] {
    if (this.isParallelSegment(segment[1], segment[3])) {
      if (segment[0] > segment[2]) {
        return [ segment[2], segment[3], segment[0], segment[1] ];
      }
    }
    return segment;
  }

  private calculateIntermediatePoints(segment: number[]): Vector3[] {
    const ra0 = segment[0];
    const ra1 = segment[2];
    const decl0 = segment[1];
    const decl1 = segment[3];

    if (this.isParallelSegment(decl0, decl1)) {
      const minRa = Math.min(ra0, ra1);
      const maxRa = Math.max(ra0, ra1);
      return this.calculateAxisPointsBetween(minRa, maxRa, decl0, (v, c) => this.toVector3(v, c));
    }
    if (this.isMeridionalSegment(ra0, ra1)) {
      const minDecl = Math.min(decl0, decl1);
      const maxDecl = Math.max(decl0, decl1);
      return this.calculateAxisPointsBetween(minDecl, maxDecl, ra0, (v, c) => this.toVector3(c, v));
    }
    console.warn(`Skipping intermediate points for unexpected segment: ${segment}`);
    return [];
  }

  private isMeridionalSegment(ra0: number, ra1: number): boolean {
    return ra0 === ra1 || (ra0 === 360 && ra1 === 0) || (ra0 === 0 && ra1 === 360);
  }

  private isParallelSegment(decl0: number, decl1: number): boolean {
    return decl0 === decl1;
  }

  private calculatePointPairs(): Vector3[] {
    let pointPairs = new Array<Vector3>();
    this.segments.forEach(segment => {
      pointPairs = pointPairs.concat(this.calculateSegment(segment));
    });
    return pointPairs;
  }

  public toObject3D(): Object3D {
    const geometry = new BufferGeometry();
    geometry.setFromPoints(this.calculatePointPairs());
    return new LineSegments(geometry, this.material);
  }

}
