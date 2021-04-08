import { Layer } from '#core/models/layers/layer';
import { ConstellationBoundaries } from '#layer-constellations/models/constellation-boundaries';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';

/**
 * Factory for the renderable layer of the constellation boundary lines.
 */
export class ConstellationBoundariesLayerFactory implements LayerFactory {

  constructor(private readonly _curvesFactory: AxialCurvesFactory) {

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
