import { Injectable } from '@angular/core';
import { Layer } from '#core/models/layers/layer';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Stars } from '#layer-stars/models/stars';
import { Searchable } from '#core/models/layers/searchable';
import { extractProperName, extractStandardName, toGreekLetter } from '#core/utils/star-utils';
import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';

/**
 * Factory for a renderable layer of stars.
 */
@Injectable()
export class StarsLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;

  private readonly _subLayerCodePrefix: string;

  constructor(private readonly _pointsFactory: PointsFactoryService) {
    this._layerCode = Stars.CODE;
    this._subLayerCodePrefix = `${this._layerCode}-mag`;
  }

  public buildRenderableLayer(model: Layer): Stars {
    const magnitudeClass = this.extractMagnitudeClass(model.code);
    const useObjects = model.objects || [];
    const stars = this._pointsFactory.createObject3D(this._layerCode, useObjects);
    const searchables = this.extractSearchables(model.objects);
    return new Stars(
      model,
      magnitudeClass,
      stars,
      this.initProperNames(model),
      this.initStandardNames(model),
      searchables
    );
  }

  private initProperNames(model: Layer): Array<RenderableText> {
    return this.initLabels(model, extractProperName, TextOffsetPolicies.TOP_RIGHT);
  }

  private initStandardNames(model: Layer): Array<RenderableText> {
    return this.initLabels(model, extractStandardName, TextOffsetPolicies.CLOSE_RIGHT, toGreekLetter);
  }

  private extractMagnitudeClass(code: string): number {
    return parseFloat(code.substr(this._subLayerCodePrefix.length));
  }

  private initLabels(
    model: Layer,
    extractNameFunct: (rawStar: Array<any>) => string,
    offset: TextOffsetPolicy,
    nameTransform: (rawName: string) => string = (rn: string) => rn
  ): Array<RenderableText> {
    const labels = new Array<RenderableText>();
    model.objects?.forEach(
      (rawStar: Array<any>) => {
        const name = extractNameFunct(rawStar);
        if (name) {
          const center = this._pointsFactory.buildPoint(this._layerCode, rawStar[0], rawStar[1]);
          const transformedName = nameTransform(name);
          const renderable = new RenderableText(center, transformedName, offset);
          labels.push(renderable);
        }
      }
    );
    return labels;
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
