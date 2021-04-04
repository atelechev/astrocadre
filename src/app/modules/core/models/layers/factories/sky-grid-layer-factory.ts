import { LineSegments } from 'three';
import { Layer } from '#core/models/layers/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SkyGrid } from '#core/models/layers/sky-grid';

export class SkyGridLayerFactory implements LayerFactory {

  private readonly _gridStepMeridians = 15;

  private readonly _gridStepParallels = 10;

  private readonly _absMaxMeridianLineDeclination = 89;

  constructor(
    private readonly _layerModel: Layer,
    private readonly _curvesFactory: AxialCurvesFactory
  ) {

  }

  public buildRenderableLayer(): SkyGrid {
    const commonMeridians = this.generateCommonMeridianSegments();
    const commonParallels = this.generateCommonParallelSegments();
    const referenceMeridian = this.generateReferenceMeridianSegments();
    const referenceParallel = this.generateReferenceParallelSegments();
    return new SkyGrid(
      this._layerModel,
      commonMeridians,
      commonParallels,
      referenceMeridian,
      referenceParallel
    );
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
    return this._curvesFactory.createObject3D(this._layerModel.code, segments);
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
