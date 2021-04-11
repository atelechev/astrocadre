import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { ConstellationBoundaries } from '#layer-constellations/models/constellation-boundaries';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';

/**
 * Factory for the renderable layer of the constellation boundary lines.
 */
@Injectable()
export class BoundariesLayerFactoryService implements LayerFactory {

  constructor(private readonly _curvesFactory: AxialCurvesFactoryService) {

  }

  public buildRenderableLayer(model: Layer): ConstellationBoundaries {
    const boundaries = this._curvesFactory
      .createObject3D(
        SupportedLayers.CONSTELLATION_BOUNDARIES,
        model.objects
      );
    return new ConstellationBoundaries(
      model,
      boundaries
    );
  }

}
