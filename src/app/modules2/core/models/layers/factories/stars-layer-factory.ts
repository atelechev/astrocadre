import { Layer } from 'src/app/modules2/core/models/layer';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { PointsFactory } from 'src/app/modules2/core/models/layers/factories/points-factory';
import { TextOffsetPolicies } from 'src/app/modules2/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { WorldConstants } from 'src/app/modules2/core/models/world-constants';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { extractProperName, extractStandardName, toGreekLetter } from 'src/app/modules2/core/utils/star-name-utils';
import { toVector3 } from 'src/app/modules2/core/utils/vector-utils';

export class StarsLayerFactory implements LayerFactory {

  public static readonly STARS_LAYER_CODE_PREFIX = `${SupportedLayers.STARS}-mag`;

  constructor(
    private readonly _layerModel: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService,
    private readonly _pointsFactory: PointsFactory
  ) {

  }

  public buildRenderableLayer(): Stars {
    const magnitudeClass = this.extractMagnitudeClass(this._layerModel.code);
    const useObjects = this._layerModel.objects || [];
    const stars = this._pointsFactory.createObject3D(SupportedLayers.STARS, useObjects);
    const properNames = this.initLabels(extractProperName, this.toProperNameRenderableText);
    const stadardNames = this.initLabels(extractStandardName, this.toStandardNameRenderableText);
    return new Stars(
      this._layerModel,
      this._materialsService,
      this._eventsService,
      magnitudeClass,
      stars,
      properNames,
      stadardNames
    );
  }

  private extractMagnitudeClass(code: string): number {
    return parseFloat(code.substr(StarsLayerFactory.STARS_LAYER_CODE_PREFIX.length));
  }

  // TODO refactor these functions!
  private initLabels(
    extractNameFunct: (rawStar: any[]) => string,
    toRenderableFunct: (ln: string, rawStar: any[], name: string) => RenderableText): Map<string, RenderableText> {
    const labels = new Map<string, RenderableText>();
    this._layerModel.objects?.forEach(
      (rawStar: any[]) => {
        const name = extractNameFunct(rawStar);
        if (name) {
          const renderable = toRenderableFunct(this._layerModel.code, rawStar, name);
          labels.set(name, renderable);
        }
      }
    );
    return labels;
  }

  private toStandardNameRenderableText(layerName: string, rawStar: any[], name: string): RenderableText {
    const greekLetter = toGreekLetter(name);
    const center = toVector3(
      rawStar[0],
      rawStar[1],
      WorldConstants.worldRadiusForLayer(SupportedLayers.STARS)
    );
    return new RenderableText(layerName, 'names-standard', center, greekLetter, TextOffsetPolicies.CLOSE_RIGHT);
  }

  private toProperNameRenderableText(
    layerName: string,
    rawStar: any[],
    name: string
  ): RenderableText {
    const center = toVector3(
      rawStar[0],
      rawStar[1],
      WorldConstants.worldRadiusForLayer(SupportedLayers.STARS)
    );
    return new RenderableText(layerName, 'names-proper', center, name, TextOffsetPolicies.TOP_RIGHT);
  }

}
