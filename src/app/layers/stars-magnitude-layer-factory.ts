import { LayerFactory } from './layer-factory';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { Injectable } from '@angular/core';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StaticDataService } from '../core/static-data-service';
import { Layers } from '../core/layers';
import { PointsFactory } from './geometry/points-factory';
import { RenderableText } from '../core/layer/label/renderable-text';
import { extractStandardName, extractProperName, toGreekLetter } from './star-name-utils';
import { toVector3 } from '../core/layer/vector-utils';
import { TextOffsetPolicies, TextOffsetPolicy } from '../core/layer/label/text-offset-policy';
import { Constants } from '../core/constants';


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

  public newLayer(tree: LayersTreeNode): Observable<StarsMagnitudeLayer> {
    const magClass = parseFloat(tree.code.substr(StarsMagnitudeLayerFactory.LAYER_PREFIX.length));
    return this.dataService.getStarsByMagnitudeClass(magClass).map(
      (rawStars: any[][]) => {
        const starPoints = this.pointsFactory.createObject3D(Layers.STARS, rawStars);
        const properNameLabels = this.initProperNameLabels(tree.code, rawStars);
        const standardNameLabels = this.initStandardNameLabels(tree.code, rawStars);
        return new StarsMagnitudeLayer(tree, magClass, starPoints, properNameLabels, standardNameLabels);
      }
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
