import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LineSegments } from 'three';
import { ConstellationMeta } from '#core/models/layers/constellation-meta';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { RenderableText } from '#core/models/layers/renderable-text';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { toVector3 } from '#core/utils/vector-utils';
import { Constellations } from '#layer-constellations/models/constellations';
import { RawConstellations } from '#layer-constellations/models/raw-constellations';
import { StaticDataService } from '#core/services/static-data.service';

/**
 * Factory for the renderable layer of the constellations.
 */
@Injectable()
export class ConstellationsLayerFactoryService implements LayerFactory {

  constructor(
    private readonly _virtualSphereService: VirtualSphereRadiusService,
    private readonly _curvesFactory: AxialCurvesFactoryService,
    private readonly _dataService: StaticDataService
  ) {

  }

  public buildRenderableLayer(): Promise<Constellations> {
    return this._dataService.getDataJson(this.code)
      .pipe(
        map(
          (rawData: Array<RawConstellations>) => this.buildConstellations(rawData[0])
        )
      ).toPromise();
  }

  private get code(): string {
    return Constellations.CODE;
  }

  private buildConstellations(rawData: RawConstellations): Constellations {
    const boundaries = this.createObject3D(rawData.boundaries);
    const lines = this.createObject3D(rawData.lines);
    const labels = this.initTexts(rawData.names);
    return new Constellations(boundaries, lines, rawData.names, labels);
  }

  private createObject3D(rawData: Array<Array<number>>): LineSegments {
    const object = this._curvesFactory
      .createObject3D(Constellations.CODE, rawData);
    object.computeLineDistances();
    return object;
  }

  private initTexts(rawMetadata: Array<ConstellationMeta>): Array<RenderableText> {
    const radius = this._virtualSphereService.getRadiusFor(this.code);
    return rawMetadata.map(
      (constMeta: ConstellationMeta) => this.toRenderableText(constMeta, radius)
    );
  }

  private toRenderableText(constMeta: ConstellationMeta, radius: number): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, radius);
    return new RenderableText(
      center,
      constMeta.names[0],
      TextOffsetPolicies.CENTERED
    );
  }

}
