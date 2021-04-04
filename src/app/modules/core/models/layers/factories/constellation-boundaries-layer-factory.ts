import { Layer } from '#core/models/layers/layer';
import { ConstellationBoundaries } from '#core/models/layers/constellation-boundaries';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';


export class ConstellationBoundariesLayerFactory implements LayerFactory {

  constructor(
    private readonly _layerModel: Layer,
    private readonly _curvesFactory: AxialCurvesFactory
  ) {

  }

  public buildRenderableLayer(): ConstellationBoundaries {
    const boundaries = this._curvesFactory
      .createObject3D(
        SupportedLayers.CONSTELLATION_BOUNDARIES,
        this._layerModel.objects
      );
    return new ConstellationBoundaries(
      this._layerModel,
      boundaries
    );
  }

}
