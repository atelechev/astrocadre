import { EllipseCurve, Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, Math as ThreeMath } from 'three';

import { RenderableLayer } from '../../renderable-layer';

export class SkyGrid implements RenderableLayer {

  private static MATERIAL: LineBasicMaterial = new LineBasicMaterial({ color : 0xffffff });

  private static POINTS_PER_CIRCLE: number = 360 / 5;

  private static GRID_RADIUS = 2;

  private meridians: Object3D[];

  private parallels: Object3D[];

  constructor() {
    this.meridians = this.buildMeridians();
    this.parallels = this.buildParallels();
  }

  private buildMeridians(): Object3D[] {
    const nbMeridians = 18;
    const circles = new Array<Object3D>();
    const angleStep = 360 / nbMeridians * 2;

    for (let i = 0; i < nbMeridians; i++) {
      const rotationAngle = angleStep * i;
      circles.push(this.initMeridian(rotationAngle));
    }

    return circles;
  }

  private initMeridian(rotationAngle: number): Object3D {
    const circle = this.initEllipse(0, 0, SkyGrid.GRID_RADIUS);
    circle.rotateY(ThreeMath.degToRad(90));
    circle.rotateX(ThreeMath.degToRad(rotationAngle));
    return circle;
  }

  private initEllipse(x: number, y: number, radius: number, z: number = 0): Object3D {
    const ellipse = this.toObject3D(new EllipseCurve(x, y, radius, radius, 0, 0, false, 0));
    if (z !== 0) {
      ellipse.position.z = z;
    }
    return ellipse;
  }

  private toObject3D(curve: EllipseCurve): Object3D {
    const points = curve.getPoints(SkyGrid.POINTS_PER_CIRCLE)
                        .map(v2 => new Vector3(v2.x, v2.y, 0));
    const geometry = new BufferGeometry().setFromPoints(points);
    return new Line(geometry, SkyGrid.MATERIAL);
  }

  private buildParallels(): Object3D[] {
    const circles = new Array<Object3D>();
    circles.push(this.initEllipse(0, 0, SkyGrid.GRID_RADIUS)); // equator

    for (let latitude = 10; latitude < 90; latitude += 10) {
      const zCoord = SkyGrid.GRID_RADIUS * latitude / 90;
      const radius = Math.sqrt(SkyGrid.GRID_RADIUS * SkyGrid.GRID_RADIUS - zCoord * zCoord);
      circles.push(this.initEllipse(0, 0, radius, zCoord));
      circles.push(this.initEllipse(0, 0, radius, -zCoord));
    }

    return circles;
  }

  public getObjects(): Object3D[] {
    return this.meridians.concat(this.parallels);
  }

}
