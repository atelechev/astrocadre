import { Layer } from 'src/app/modules2/core/models/layer';
import { ConstellationLines } from 'src/app/modules2/core/models/layers/constellation-lines';
import { AxialCurvesFactory } from 'src/app/modules2/core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';


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
