import { Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line } from 'three';


export class Axes {

  private static AXIS_LENGTH = 1.5;

  private static ORIGIN: Vector3 = new Vector3(0, 0, 0);

  private lines: Object3D[];

  constructor() {
    this.lines = this.buildAxes();
  }

  private buildAxes(): Object3D[] {
    return new Array<Object3D>(
      this.buildAxis(this.asVector3(Axes.AXIS_LENGTH, 0, 0), 0xff0000),
      this.buildAxis(this.asVector3(0, Axes.AXIS_LENGTH, 0), 0x00ff00),
      this.buildAxis(this.asVector3(0, 0, Axes.AXIS_LENGTH), 0x0000ff)
    );
  }

  private buildAxis(destPoint: Vector3, color: number): Object3D {
    const material = new LineBasicMaterial({ color: color});
    const geometry = new BufferGeometry().setFromPoints(
      new Array<Vector3>(Axes.ORIGIN, destPoint)
    );
    return new Line(geometry, material);
  }

  private asVector3(x: number, y: number, z: number): Vector3 {
    return new Vector3(x, y, z);
  }

  public getGrid(): Object3D[] {
    return this.lines;
  }

}
