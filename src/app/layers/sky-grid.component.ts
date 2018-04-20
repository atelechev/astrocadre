import { EllipseCurve, Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, Math as ThreeMath } from 'three';

import { RenderableLayer } from '../core/renderable-layer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  template: ``
})
export class SkyGridComponent implements RenderableLayer {

  private static MATERIAL: LineBasicMaterial = new LineBasicMaterial({ color : 0x999999 });
  private static MATERIAL_REF_AXIS: LineBasicMaterial = new LineBasicMaterial({ color : 0x00ff99 }); // TODO

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

    circles.push(this.initMeridian(0, SkyGridComponent.MATERIAL_REF_AXIS));
    for (let i = 1; i < nbMeridians; i++) {
      const rotationAngle = angleStep * i;
      circles.push(this.initMeridian(rotationAngle));
    }

    return circles;
  }

  private initMeridian(rotationAngle: number, material: LineBasicMaterial = SkyGridComponent.MATERIAL): Object3D {
    const circle = this.initEllipse(0, 0, SkyGridComponent.GRID_RADIUS, 0, material);
    circle.rotateY(ThreeMath.degToRad(90));
    circle.rotateX(ThreeMath.degToRad(rotationAngle));
    return circle;
  }

  private initEllipse(x: number,
                      y: number,
                      radius: number,
                      z: number = 0,
                      material: LineBasicMaterial = SkyGridComponent.MATERIAL): Object3D {
    const ellipse = this.toObject3D(new EllipseCurve(x, y, radius, radius, 0, 0, false, 0), material);
    if (z !== 0) {
      ellipse.position.z = z;
    }
    return ellipse;
  }

  private toObject3D(curve: EllipseCurve, material: LineBasicMaterial): Object3D {
    const points = curve.getPoints(SkyGridComponent.POINTS_PER_CIRCLE)
                        .map(v2 => new Vector3(v2.x, v2.y, 0));
    const geometry = new BufferGeometry().setFromPoints(points);
    return new Line(geometry, material);
  }

  private buildParallels(): Object3D[] {
    const circles = new Array<Object3D>();
    circles.push(this.initEllipse(0, 0, SkyGridComponent.GRID_RADIUS, 0, SkyGridComponent.MATERIAL_REF_AXIS));

    for (let latitude = 10; latitude < 90; latitude += 10) {
      const zCoord = SkyGridComponent.GRID_RADIUS * latitude / 90;
      const radius = Math.sqrt(SkyGridComponent.GRID_RADIUS * SkyGridComponent.GRID_RADIUS - zCoord * zCoord);
      circles.push(this.initEllipse(0, 0, radius, zCoord));
      circles.push(this.initEllipse(0, 0, radius, -zCoord));
    }

    return circles;
  }

  public getObjects(): Observable<Object3D[]> {
    return Observable.of(this.meridians.concat(this.parallels));
  }

  public getName(): string {
    return 'sky-grid';
  }

}
