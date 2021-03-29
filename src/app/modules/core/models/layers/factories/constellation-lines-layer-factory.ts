import { Layer } from '#core/models/layer';
import { ConstellationLines } from '#core/models/layers/constellation-lines';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SupportedLayers } from '#core/models/supported-layers';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';


export class ConstellationLinesLayerFactory implements LayerFactory {

  constructor(
    private readonly _layerModel: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService,
    private readonly _curvesFactory: AxialCurvesFactory
  ) {

  }

  public buildRenderableLayer(): ConstellationLines {
    const lines = this._curvesFactory
      .createObject3D(
        SupportedLayers.CONSTELLATION_LINES,
        this._layerModel.objects
      );
    return new ConstellationLines(
      this._layerModel,
      this._materialsService,
      this._eventsService,
      lines
    );
  }

}
