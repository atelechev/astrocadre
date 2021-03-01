import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { LineSegments } from 'three';
import { AxialCurvesFactory } from '#layers/services/axial-curves-factory';
import { LayerFactory } from '#layers/services/layer-factory';
import { SkyGridLayer } from '#layers/models/sky-grid-layer';
import { Layers } from '#core/layers';
import { TreeNode } from '#core/tree-node';



@Injectable()
export class SkyGridLayerFactory implements LayerFactory<SkyGridLayer> {

  private gridStepMeridians = 15;

  private gridStepParallels = 10;

  private absMaxMeridianLineDeclination = 89;

  constructor(private objectsFactory: AxialCurvesFactory) {

  }

  public newLayer(tree: TreeNode): Observable<SkyGridLayer> {
    const commonMeridians = this.generateCommonMeridianSegments();
    const commonParallels = this.generateCommonParallelSegments();
    const referenceMeridian = this.generateReferenceMeridianSegments();
    const referenceParallel = this.generateReferenceParallelSegments();
    const layer = new SkyGridLayer(tree, commonMeridians, commonParallels, referenceMeridian, referenceParallel);
    return observableOf(layer);
  }

  private generateCommonMeridianSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let i = 0; i < 360; i += this.gridStepMeridians) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return this.createLineSegmentsWith(segments);
  }

  private meridianSegment(ra: number): number[] {
    return [ra, this.absMaxMeridianLineDeclination, ra, -this.absMaxMeridianLineDeclination];
  }

  private createLineSegmentsWith(segments: number[][]): LineSegments {
    return this.objectsFactory.createObject3D(Layers.SKY_GRID, segments);
  }

  private generateCommonParallelSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let par = this.gridStepParallels; par < 90; par += this.gridStepParallels) {
      segments.push(this.parallelSegment(par));
      segments.push(this.parallelSegment(-par));
    }
    return this.createLineSegmentsWith(segments);
  }

  private parallelSegment(decl: number): number[] {
    return [0.01, decl, 359.99, decl];
  }

  private generateReferenceMeridianSegments(): LineSegments {
    const refSegments = [this.meridianSegment(0), this.meridianSegment(180)];
    return this.createLineSegmentsWith(refSegments);
  }

  private generateReferenceParallelSegments(): LineSegments {
    const refSegments = [this.parallelSegment(0)];
    return this.createLineSegmentsWith(refSegments);
  }

}
