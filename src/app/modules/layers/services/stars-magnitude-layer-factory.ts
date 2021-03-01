import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '#core/models/constants';
import { Layers } from '#core/models/layers';
import { RenderableText } from '#core/models/renderable-text';
import { TextOffsetPolicies, TextOffsetPolicy } from '#core/models/text-offset-policy';
import { TreeNode } from '#core/models/tree-node';
import { StaticDataService } from '#core/services/static-data.service';
import { toVector3 } from '#core/utils/vector-utils';
import { PointsFactory } from '#layers/services/points-factory';
import { LayerFactory } from '#layers/services/layer-factory';
import { extractProperName, extractStandardName, toGreekLetter } from '#layers/utils/star-name-utils';
import { StarsMagnitudeLayer } from '#layers/models/stars-magnitude-layer';


@Injectable()
export class StarsMagnitudeLayerFactory implements LayerFactory<StarsMagnitudeLayer> {

  public static readonly LAYER_PREFIX = Layers.STARS + '-mag';

  constructor(private dataService: StaticDataService,
    private pointsFactory: PointsFactory) {

  }

  // TODO the static functions returning RenderableText should be moved outside this builder (into RenderableText?)
  private static toStandardNameRenderableText(layerName: string, rawStar: any[], name: string): RenderableText {
    const greekLetter = toGreekLetter(name);
    return StarsMagnitudeLayerFactory.toNameRenderableText(layerName,
      rawStar,
      StarsMagnitudeLayer.LABELTYPE_NAME_STANDARD,
      greekLetter,
      TextOffsetPolicies.CLOSE_RIGHT);
  }

  private static toProperNameRenderableText(layerName: string, rawStar: any[], name): RenderableText {
    return StarsMagnitudeLayerFactory.toNameRenderableText(layerName,
      rawStar,
      StarsMagnitudeLayer.LABELTYPE_NAME_PROPER,
      name,
      TextOffsetPolicies.TOP_RIGHT);
  }

  private static toNameRenderableText(layerName: string,
    rawStar: any[],
    styleKey: string,
    name: string,
    offsetPolicy: TextOffsetPolicy): RenderableText {
    const center = toVector3(rawStar[0], rawStar[1], Constants.getWorldRadiusForLayer(Layers.STARS));
    return new RenderableText(layerName, styleKey, center, name, offsetPolicy);
  }

  public newLayer(tree: TreeNode): Observable<StarsMagnitudeLayer> {
    const magClass = parseFloat(tree.code.substr(StarsMagnitudeLayerFactory.LAYER_PREFIX.length));
    return this.dataService.getStarsByMagnitudeClass(magClass).pipe(
      map((rawStars: any[][]) => {
        const starPoints = this.pointsFactory.createObject3D(Layers.STARS, rawStars);
        const properNameLabels = this.initProperNameLabels(tree.code, rawStars);
        const standardNameLabels = this.initStandardNameLabels(tree.code, rawStars);
        return new StarsMagnitudeLayer(tree, magClass, starPoints, properNameLabels, standardNameLabels);
      })
    );
  }

  private initProperNameLabels(layerName: string, rawStars: any[][]): Map<string, RenderableText> {
    return this.initLabels(layerName,
      rawStars,
      extractProperName,
      StarsMagnitudeLayerFactory.toProperNameRenderableText);
  }

  private initStandardNameLabels(layerName: string, rawStars: any[][]): Map<string, RenderableText> {
    return this.initLabels(layerName,
      rawStars,
      extractStandardName,
      StarsMagnitudeLayerFactory.toStandardNameRenderableText);
  }

  private initLabels(layerName: string,
    rawStars: any[][],
    extractNameFunct: (rawStar: any[]) => string,
    toRenderableFunct: (ln: string, rawStar: any[], name: string) => RenderableText): Map<string, RenderableText> {
    const labels = new Map<string, RenderableText>();
    rawStars.forEach(
      (rawStar: any[]) => {
        const name = extractNameFunct(rawStar);
        if (name) {
          const renderable = toRenderableFunct(layerName, rawStar, name);
          labels.set(name, renderable);
        }
      }
    );
    return labels;
  }

}
