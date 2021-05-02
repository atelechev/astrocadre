import { Injectable } from '@angular/core';
import { LineSegments } from 'three';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';

/**
 * Factory for the renderable layer of the celestial coordinates grid.
 */
@Injectable()
export class SkyGridLayerFactoryService implements LayerFactory {

  private readonly _gridStepMeridians = 15;

  private readonly _gridStepParallels = 10;

  private readonly _absMaxMeridianLineDeclination = 89;

  constructor(private readonly _curvesFactory: AxialCurvesFactoryService) {

  }

  public buildRenderableLayer(): Promise<SkyGrid> {
    const commonMeridians = this.generateCommonMeridianSegments();
    const commonParallels = this.generateCommonParallelSegments();
    const referenceMeridian = this.generateReferenceMeridianSegments();
    const referenceParallel = this.generateReferenceParallelSegments();
    const layer = new SkyGrid(
      commonMeridians,
      commonParallels,
      referenceMeridian,
      referenceParallel
    );
    return new Promise((resolve) => resolve(layer));
  }

  private generateCommonMeridianSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let i = 0; i < 360; i += this._gridStepMeridians) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return this.createLineSegmentsWith(segments);
  }

  private meridianSegment(ra: number): number[] {
    return [ra, this._absMaxMeridianLineDeclination, ra, -this._absMaxMeridianLineDeclination];
  }

  private createLineSegmentsWith(segments: number[][]): LineSegments {
    const lineSegs = this._curvesFactory.createObject3D(SkyGrid.CODE, segments);
    lineSegs.computeLineDistances();
    return lineSegs;
  }

  private generateCommonParallelSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let par = this._gridStepParallels; par < 90; par += this._gridStepParallels) {
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
