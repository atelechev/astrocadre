import { EllipseCurve, Object3D, LineBasicMaterial, BufferGeometry, Vector3, Line, Math as ThreeMath } from 'three';

import { RenderableLayer } from '../core/renderable-layer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MergedAxialCurves } from './model/merged-axial-curves';

@Component({
  template: ``
})
export class SkyGridComponent implements RenderableLayer {

  private static POINTS_PER_CIRCLE: number = 360 / 5;

  private gridRadius = 2;

  private absMeridianLineDeclination = 89.5;

  private ordinaryLineMaterial: LineBasicMaterial = new LineBasicMaterial({ color : 0x2821af });

  private referenceLineMaterial: LineBasicMaterial = new LineBasicMaterial({ color : 0x00ff99 }); // TODO

  private buildMeridians(): Object3D[] {
    const ordinaryMeridians = this.generateOrdinaryMeridianSegments();
    const refMeridians = this.generateReferenceMeridianSegments();
    return [ ordinaryMeridians.toObject3D(), refMeridians.toObject3D() ];
  }

  private generateReferenceMeridianSegments(): MergedAxialCurves {
    const refSegments = [ this.meridianSegment(0), this.meridianSegment(180)];
    return new MergedAxialCurves(this.referenceLineMaterial, refSegments, this.gridRadius);
  }

  private meridianSegment(ra: number): number[] {
    return [ ra, this.absMeridianLineDeclination, ra, -this.absMeridianLineDeclination ];
  }

  private generateOrdinaryMeridianSegments(): MergedAxialCurves {
    const segments = new Array<number[]>();
    const step = 10;
    for (let i = 0; i < 360; i += step) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return new MergedAxialCurves(this.ordinaryLineMaterial, segments, this.gridRadius);
  }

  private initEllipse(x: number,
                      y: number,
                      radius: number,
                      z: number = 0,
                      material: LineBasicMaterial = this.ordinaryLineMaterial): Object3D {
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
    circles.push(this.initEllipse(0, 0, this.gridRadius, 0, this.referenceLineMaterial));
    const squareRadius = this.gridRadius * this.gridRadius;

    for (let latitude = 10; latitude < 90; latitude += 10) {
      const zCoord = this.gridRadius * latitude / 90;
      const radius = Math.sqrt(squareRadius - zCoord * zCoord);
      circles.push(this.initEllipse(0, 0, radius, zCoord));
      circles.push(this.initEllipse(0, 0, radius, -zCoord));
    }

    return circles;
  }

  public getObjects(): Observable<Object3D[]> {
    const meridians = this.buildMeridians();
    const parallels = this.buildParallels();
    return Observable.of(meridians.concat(parallels));
  }

  public getName(): string {
    return 'sky-grid';
  }

}
