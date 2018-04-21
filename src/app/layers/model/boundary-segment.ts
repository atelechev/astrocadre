import { Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, EllipseCurve } from 'three';
import { ConstellationBoundariesComponent } from '../constellation-boundaries.component';


export class BoundarySegment {

  private static MATERIAL: LineBasicMaterial = new LineBasicMaterial({ color : 0xff00ff });

  private static GRID_RADIUS = 2;

  constructor(private ra0: number,
              private decl0: number,
              private ra1: number,
              private decl1: number) {

              }

  private isMeridional(): boolean {
    return this.ra0 === this.ra1;
  }

  private isParallel(): boolean {
    return this.decl0 === this.decl1;
  }

  public toObject3D(): Object3D | undefined {
    if (this.isMeridional()) {

    }
    if (this.isParallel()) {
      const zCoord = BoundarySegment.GRID_RADIUS * this.decl0 / 90;
      const radius = Math.sqrt(BoundarySegment.GRID_RADIUS * BoundarySegment.GRID_RADIUS - zCoord * zCoord);
      const curve = new EllipseCurve(0, 0, radius, radius, 0, 0, false, 0); // TODO
      const points = curve.getPoints(36) // TODO
                          .map(v2 => new Vector3(v2.x, v2.y, 0));
      const geometry = new BufferGeometry().setFromPoints(points);
      const segment = new Line(geometry, BoundarySegment.MATERIAL);
      segment.position.z = zCoord;
      return segment;
    }
    // console.warn(`Unexpected constellation boundary segment: (${this.ra0},${this.decl0}), (${this.ra1},${this.decl1})`);
    return undefined;
  }


}
