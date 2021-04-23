import { Injectable } from '@angular/core';
import { ConstellationMeta } from '#core/models/layers/constellation-meta';
import { Layer } from '#core/models/layers/layer';
import { ConstellationNames } from '#layer-constellations/models/constellation-names';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';

/**
 * Factory for the renderable layer of the constellation names.
 */
@Injectable()
export class NamesLayerFactoryService implements LayerFactory {

  private _layerRadius: number;

  constructor(private readonly _virtualSphereService: VirtualSphereRadiusService) {

  }

  public buildRenderableLayer(model: Layer): ConstellationNames {
    this._layerRadius = this._virtualSphereService.getRadiusFor(model.code);
    const labels = this.initTexts(model.objects);
    return new ConstellationNames(model, labels);
  }

  private initTexts(rawMetadata: Array<ConstellationMeta>): Array<RenderableText> {
    return rawMetadata.map(
      (constMeta: ConstellationMeta) => this.toRenderableText(constMeta)
    );
  }

  private toRenderableText(constMeta: ConstellationMeta): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, this._layerRadius);
    return new RenderableText(
      center,
      constMeta.names[0],
      TextOffsetPolicies.CENTERED
    );
  }

}
