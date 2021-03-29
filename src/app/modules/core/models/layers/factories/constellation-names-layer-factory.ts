import { ConstellationMeta } from '#core/models/constellation-meta';
import { Layer } from '#core/models/layer';
import { ConstellationNames } from '#core/models/layers/constellation-names';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { TextOffsetPolicies } from '#core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Materials } from '#core/models/materials';
import { WorldConstants } from '#core/models/world-constants';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';
import { toVector3 } from '#core/utils/vector-utils';


export class ConstellationNamesLayerFactory implements LayerFactory {

  constructor(
    private readonly _layerModel: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
  ) {

  }

  public buildRenderableLayer(): ConstellationNames {
    const labels = this.initRenderableLabels(this._layerModel.code, this._layerModel.objects);
    return new ConstellationNames(
      this._layerModel,
      this._materialsService,
      this._eventsService,
      labels
    );
  }

  private initRenderableLabels(layer: string, rawMetadata: Array<ConstellationMeta>): Map<string, RenderableText> {
    const renderableLabels = new Map<string, RenderableText>();
    rawMetadata.forEach(
      (constMeta: ConstellationMeta) => {
        const renderable = this.toRenderableText(layer, constMeta);
        renderableLabels.set(constMeta.code, renderable);
      });
    return renderableLabels;
  }

  private toRenderableText(layer: string, constMeta: ConstellationMeta): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, WorldConstants.worldRadiusForLayer(layer));
    return new RenderableText(
      layer,
      Materials.LABELS,
      center,
      constMeta.names[0],
      TextOffsetPolicies.CENTERED
    );
  }

}