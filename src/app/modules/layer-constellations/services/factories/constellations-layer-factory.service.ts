import { Injectable } from '@angular/core';
import { LineSegments } from 'three';
import { ConstellationMeta } from '#core/models/layers/constellation-meta';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { RenderableText } from '#core/models/layers/renderable-text';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { toVector3 } from '#core/utils/vector-utils';
import { Constellations } from '#layer-constellations/models/constellations';
import { RawConstellations } from '#layer-constellations/models/raw-constellations';

/**
 * Factory for the renderable layer of the constellations.
 */
@Injectable()
export class ConstellationsLayerFactoryService implements LayerFactory {

  private _layerRadius: number;

  constructor(
    private readonly _virtualSphereService: VirtualSphereRadiusService,
    private readonly _curvesFactory: AxialCurvesFactoryService
  ) {

  }

  public buildRenderableLayer(model: Layer): Constellations {
    this._layerRadius = this._virtualSphereService.getRadiusFor(model.code);
    const rawData = model.objects[0] as RawConstellations;
    const boundaries = this.createObject3D(rawData.boundaries);
    const lines = this.createObject3D(rawData.lines);
    const labels = this.initTexts(rawData.names);
    return new Constellations(model, boundaries, lines, labels);
  }

  private createObject3D(rawData: Array<Array<number>>): LineSegments {
    const object = this._curvesFactory
      .createObject3D(Constellations.CODE, rawData);
    object.computeLineDistances();
    return object;
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
