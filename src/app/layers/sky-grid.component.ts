import { Object3D, LineBasicMaterial } from 'three';

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

  private gridStep = 10;

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
    for (let i = 0; i < 360; i += this.gridStep) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return new MergedAxialCurves(this.ordinaryLineMaterial, segments, this.gridRadius);
  }

  private parallelSegment(decl: number): number[] {
    return [ 0.01, decl, 359.99, decl ];
  }

  private generateReferenceParallelSegments(): MergedAxialCurves {
    const refSegments = [ this.parallelSegment(0) ];
    return new MergedAxialCurves(this.referenceLineMaterial, refSegments, this.gridRadius);
  }

  private generateOrdinaryParallelSegments(): MergedAxialCurves {
    const segments = new Array<number[]>();
    for (let par = this.gridStep; par < 90; par += this.gridStep) {
      segments.push(this.parallelSegment(par));
      segments.push(this.parallelSegment(-par));
    }
    return new MergedAxialCurves(this.ordinaryLineMaterial, segments, this.gridRadius);
  }

  private buildParallels(): Object3D[] {
    const ordinaryParallels = this.generateOrdinaryParallelSegments();
    const equator = this.generateReferenceParallelSegments();
    return [ ordinaryParallels.toObject3D(), equator.toObject3D() ];
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
