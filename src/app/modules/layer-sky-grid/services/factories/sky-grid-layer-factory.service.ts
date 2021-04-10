import { Injectable } from '@angular/core';
import { LineSegments } from 'three';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { Layer } from '#core/models/layers/layer';
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

  public buildRenderableLayer(model: Layer): SkyGrid {
    const commonMeridians = this.generateCommonMeridianSegments(model);
    const commonParallels = this.generateCommonParallelSegments(model);
    const referenceMeridian = this.generateReferenceMeridianSegments(model);
    const referenceParallel = this.generateReferenceParallelSegments(model);
    return new SkyGrid(
      model,
      commonMeridians,
      commonParallels,
      referenceMeridian,
      referenceParallel
    );
  }

  private generateCommonMeridianSegments(model: Layer): LineSegments {
    const segments = new Array<number[]>();
    for (let i = 0; i < 360; i += this._gridStepMeridians) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return this.createLineSegmentsWith(model, segments);
  }

  private meridianSegment(ra: number): number[] {
    return [ra, this._absMaxMeridianLineDeclination, ra, -this._absMaxMeridianLineDeclination];
  }

  private createLineSegmentsWith(model: Layer, segments: number[][]): LineSegments {
    return this._curvesFactory.createObject3D(model.code, segments);
  }

  private generateCommonParallelSegments(model: Layer): LineSegments {
    const segments = new Array<number[]>();
    for (let par = this._gridStepParallels; par < 90; par += this._gridStepParallels) {
      segments.push(this.parallelSegment(par));
      segments.push(this.parallelSegment(-par));
    }
    return this.createLineSegmentsWith(model, segments);
  }

  private parallelSegment(decl: number): number[] {
    return [0.01, decl, 359.99, decl];
  }

  private generateReferenceMeridianSegments(model: Layer): LineSegments {
    const refSegments = [this.meridianSegment(0), this.meridianSegment(180)];
    return this.createLineSegmentsWith(model, refSegments);
  }

  private generateReferenceParallelSegments(model: Layer): LineSegments {
    const refSegments = [this.parallelSegment(0)];
    return this.createLineSegmentsWith(model, refSegments);
  }

}
