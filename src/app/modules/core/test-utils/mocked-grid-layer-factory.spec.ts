import { Injectable } from '@angular/core';
import { LineSegments } from 'three';
import { Layer } from '#core/models/layers/layer';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { MockedGrid } from '#core/test-utils/mocked-grid.spec';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { RenderableText } from '#core/models/layers/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { WorldConstants } from '#core/models/world-constants';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';


@Injectable()
export class MockedGridLayerFactory implements LayerFactory {

  private readonly _absMaxMeridianLineDeclination = 89;

  private readonly _layerModel: Layer;

  constructor(private readonly _curvesFactory: AxialCurvesFactoryService) {
    this._layerModel = mockedLayers.subLayers[0];
  }

  public buildRenderableLayer(): MockedGrid {
    const referenceMeridian = this.generateReferenceMeridianSegments();
    const referenceParallel = this.generateReferenceParallelSegments();
    const texts = this.buildTexts();
    return new MockedGrid(
      this._layerModel,
      referenceMeridian,
      referenceParallel,
      texts
    );
  }

  private buildTexts(): Array<RenderableText> {
    return [new RenderableText(
      toVector3(37.95, 89.26, WorldConstants.worldRadiusForLayer('sky-grid')),
      'Polaris',
      TextOffsetPolicies.CENTERED
    )];
  }

  private meridianSegment(ra: number): number[] {
    return [ra, this._absMaxMeridianLineDeclination, ra, -this._absMaxMeridianLineDeclination];
  }

  private createLineSegmentsWith(segments: number[][]): LineSegments {
    return this._curvesFactory.createObject3D(this._layerModel.code, segments);
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
