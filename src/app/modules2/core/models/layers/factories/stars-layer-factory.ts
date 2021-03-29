import { Layer } from 'src/app/modules2/core/models/layer';
import { LayerFactory } from 'src/app/modules2/core/models/layers/factories/layer-factory';
import { PointsFactory } from 'src/app/modules2/core/models/layers/factories/points-factory';
import { TextOffsetPolicies } from 'src/app/modules2/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { Materials } from 'src/app/modules2/core/models/materials';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { WorldConstants } from 'src/app/modules2/core/models/world-constants';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { extractProperName, extractStandardName, toGreekLetter } from 'src/app/modules2/core/utils/star-name-utils';
import { toVector3 } from 'src/app/modules2/core/utils/vector-utils';

export class StarsLayerFactory implements LayerFactory {

  public static readonly STARS_LAYER_CODE_PREFIX = `${SupportedLayers.STARS}-mag`;

  // TODO a single factory may be used to build different instances, the model arg should be passed into buildRenderableLayer
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
    const standardNames = this.initLabels(extractStandardName, this.toStandardNameRenderableText);
    const searchables = this.extractSearchables(this._layerModel.objects);
    return new Stars(
      this._layerModel,
      this._materialsService,
      this._eventsService,
      magnitudeClass,
      stars,
      properNames,
      standardNames,
      searchables
    );
  }

  private extractMagnitudeClass(code: string): number {
    return parseFloat(code.substr(StarsLayerFactory.STARS_LAYER_CODE_PREFIX.length));
  }

  // TODO refactor these functions and test them separately
  private initLabels(
    extractNameFunct: (rawStar: any[]) => string,
    toRenderableFunct: (ln: string, rawStar: any[], name: string) => RenderableText): Array<RenderableText> {
    const labels = new Array<RenderableText>();
    this._layerModel.objects?.forEach(
      (rawStar: any[]) => {
        const name = extractNameFunct(rawStar);
        if (name) {
          const renderable = toRenderableFunct(this._layerModel.code, rawStar, name);
          labels.push(renderable);
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
    return new RenderableText(
      layerName,
      Materials.NAMES_STANDARD,
      center,
      greekLetter,
      TextOffsetPolicies.CLOSE_RIGHT
    );
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
    return new RenderableText(
      layerName,
      Materials.NAMES_PROPER,
      center,
      name,
      TextOffsetPolicies.TOP_RIGHT
    );
  }

  private extractSearchables(rawStars: Array<Array<any>>): Array<Searchable> {
    return rawStars?.map((rs: Array<any>) => this.toSearchable(rs))
      .filter((searchable: Searchable) => !!searchable) || [];
  }

  private toSearchable(rawStar: Array<any>): Searchable {
    if (!rawStar || rawStar.length < 4) {
      return undefined;
    }
    const ra = rawStar[0] as number;
    const dec = rawStar[1] as number;
    const code = rawStar.length === 5 ? rawStar[4] : rawStar[3];
    const names = rawStar.length === 5 ? [rawStar[3]] : [];
    return {
      type: 'star',
      ra,
      dec,
      code,
      names
    };
  }

}
