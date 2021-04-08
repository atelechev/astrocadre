import { Layer } from '#core/models/layers/layer';
import { ConstellationLines } from '#layer-constellations/models/constellation-lines';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';

/**
 * Factory for the renderable layer of the constellation lines.
 */
export class ConstellationLinesLayerFactory implements LayerFactory {

  constructor(private readonly _curvesFactory: AxialCurvesFactory) {

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
