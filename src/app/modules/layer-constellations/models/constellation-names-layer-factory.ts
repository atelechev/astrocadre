import { ConstellationMeta } from '#core/models/layers/constellation-meta';
import { Layer } from '#core/models/layers/layer';
import { ConstellationNames } from '#layer-constellations/models/constellation-names';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { TextOffsetPolicies } from '#core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { WorldConstants } from '#core/models/world-constants';
import { toVector3 } from '#core/utils/vector-utils';

/**
 * Factory for the renderable layer of the constellation names.
 */
export class ConstellationNamesLayerFactory implements LayerFactory {

  private readonly _worldRadius: number;

  constructor(private readonly _layerModel: Layer) {
    this._worldRadius = WorldConstants.worldRadiusForLayer(_layerModel.code);
  }

  public buildRenderableLayer(): ConstellationNames {
    const labels = this.initTexts(this._layerModel.objects);
    return new ConstellationNames(this._layerModel, labels);
  }

  private initTexts(rawMetadata: Array<ConstellationMeta>): Array<RenderableText> {
    return rawMetadata.map(
      (constMeta: ConstellationMeta) => this.toRenderableText(constMeta)
    );
  }

  private toRenderableText(constMeta: ConstellationMeta): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, this._worldRadius);
    return new RenderableText(
      center,
      constMeta.names[0],
      TextOffsetPolicies.CENTERED
    );
  }

}
