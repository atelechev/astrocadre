import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { ConstellationLines } from '#layer-constellations/models/constellation-lines';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';

/**
 * Factory for the renderable layer of the constellation lines.
 */
@Injectable()
export class LinesLayerFactoryService implements LayerFactory {

  constructor(private readonly _curvesFactory: AxialCurvesFactoryService) {

  }

  public buildRenderableLayer(model: Layer): ConstellationLines {
    const lines = this._curvesFactory
      .createObject3D(
        SupportedLayers.CONSTELLATION_LINES,
        model.objects
      );
    return new ConstellationLines(
      model,
      lines
    );
  }

}
