import { Layer } from '#core/models/layer';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { TextOffsetPolicies } from '#core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Stars } from '#core/models/layers/stars';
import { Searchable } from '#core/models/searchable';
import { SupportedLayers } from '#core/models/supported-layers';
import { WorldConstants } from '#core/models/world-constants';
import { extractProperName, extractStandardName, toGreekLetter } from '#core/utils/star-name-utils';
import { toVector3 } from '#core/utils/vector-utils';

export class StarsLayerFactory implements LayerFactory {

  public static readonly STARS_LAYER_CODE_PREFIX = `${SupportedLayers.STARS}-mag`;

  // TODO a single factory may be used to build different instances, the model arg should be passed into buildRenderableLayer
  constructor(
    private readonly _layerModel: Layer,
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
    toRenderableFunct: (rawStar: any[], name: string) => RenderableText): Array<RenderableText> {
    const labels = new Array<RenderableText>();
    this._layerModel.objects?.forEach(
      (rawStar: any[]) => {
        const name = extractNameFunct(rawStar);
        if (name) {
          const renderable = toRenderableFunct(rawStar, name);
          labels.push(renderable);
        }
      }
    );
    return labels;
  }

  private toStandardNameRenderableText(rawStar: any[], name: string): RenderableText {
    const greekLetter = toGreekLetter(name);
    const center = toVector3(
      rawStar[0],
      rawStar[1],
      WorldConstants.worldRadiusForLayer(SupportedLayers.STARS)
    );
    return new RenderableText(
      center,
      greekLetter,
      TextOffsetPolicies.CLOSE_RIGHT
    );
  }

  private toProperNameRenderableText(rawStar: any[], name: string): RenderableText {
    const center = toVector3(
      rawStar[0],
      rawStar[1],
      WorldConstants.worldRadiusForLayer(SupportedLayers.STARS)
    );
    return new RenderableText(
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
