import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LayerFactory } from '#core/models/layers/layer-factory';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Stars } from '#layer-stars/models/stars';
import { Searchable } from '#core/models/layers/searchable';
import { extractProperName, extractStandardName, toGreekLetter } from '#core/utils/star-utils';
import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';
import { StaticDataService } from '#core/services/static-data.service';

/**
 * Factory for a renderable layer of stars.
 */
@Injectable()
export class StarsLayerFactoryService implements LayerFactory {

  private readonly _layerCode: string;

  private readonly _subLayerCodePrefix: string;

  constructor(
    private readonly _pointsFactory: PointsFactoryService,
    private readonly _dataService: StaticDataService
  ) {
    this._layerCode = Stars.CODE;
    this._subLayerCodePrefix = `${this._layerCode}-mag`;
  }

  public buildRenderableLayer(code?: string): Promise<RenderableLayer> {
    if (!code || code === this._layerCode) {
      return this.buildAggregate();
    }
    return this._dataService.getDataJson(code)
      .pipe(
        map(
          (rawData: Array<any>) => this.buildStars(code, rawData)
        )
      ).toPromise();
  }

  private buildStars(code: string, rawData: Array<any>): Stars {
    const magnitudeClass = this.extractMagnitudeClass(code);
    const stars = this._pointsFactory.createObject3D(this._layerCode, rawData);
    const searchables = this.extractSearchables(rawData);
    return new Stars(
      code,
      magnitudeClass,
      stars,
      this.initProperNames(rawData),
      this.initStandardNames(rawData),
      searchables
    );
  }

  private buildAggregate(): Promise<RenderableLayer> {
    const subLayerCodes = Array(9).fill(2)
      .map((initial: number, i: number) => initial + i * 0.5)
      .map((magnitude: number) => `${this._subLayerCodePrefix}${magnitude.toFixed(1)}`);
    const aggregate = new AggregateLayer(Stars.CODE, subLayerCodes, 'Stars', 'Stars of various magnitudes');
    return Promise.resolve(aggregate);
  }

  private initProperNames(rawData: Array<any>): Array<RenderableText> {
    return this.initLabels(rawData, extractProperName, TextOffsetPolicies.TOP_RIGHT);
  }

  private initStandardNames(rawData: Array<any>): Array<RenderableText> {
    return this.initLabels(rawData, extractStandardName, TextOffsetPolicies.CLOSE_RIGHT, toGreekLetter);
  }

  private extractMagnitudeClass(code: string): number {
    return parseFloat(code.substr(this._subLayerCodePrefix.length));
  }

  private initLabels(
    rawData: Array<any>,
    extractNameFunct: (rawStar: Array<any>) => string,
    offset: TextOffsetPolicy,
    nameTransform: (rawName: string) => string = (rn: string) => rn
  ): Array<RenderableText> {
    const labels = new Array<RenderableText>();
    rawData.forEach(
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
