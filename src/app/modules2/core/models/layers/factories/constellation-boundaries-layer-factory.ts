import { Layer } from 'src/app/modules2/core/models/layer';
import { ConstellationBoundaries } from 'src/app/modules2/core/models/layers/constellation-boundaries';
import { AxialCurvesFactory } from 'src/app/modules2/core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';


export class ConstellationBoundariesLayerFactory implements LayerFactory {

  constructor(
    private readonly _layerModel: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService,
    private readonly _curvesFactory: AxialCurvesFactory
  ) {

  }

  public buildRenderableLayer(): ConstellationBoundaries {
    const boundaries = this._curvesFactory.createObject3D('constellation-boundaries', this._layerModel.objects); // TODO const
    return new ConstellationBoundaries(
      this._layerModel,
      this._materialsService,
      this._eventsService,
      boundaries
    );
  }

}
