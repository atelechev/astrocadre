import { Injectable } from '@angular/core';
import { LayerFactory } from './layer-factory';
import { ConstellationNamesLayer } from './constellation-names-layer';
import { TreeNode } from '../core/tree-node';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaticDataService } from '../core/static-data-service';
import { ConstellationMetadata } from '../core/layer/constellation-metadata';
import { RenderableText } from '../core/layer/label/renderable-text';
import { toVector3 } from '../core/layer/vector-utils';
import { Constants } from '../core/constants';
import { TextOffsetPolicies } from '../core/layer/label/text-offset-policy';

@Injectable()
export class ConstellationNamesLayerFactory implements LayerFactory<ConstellationNamesLayer> {

  constructor(private dataService: StaticDataService) {

  }

  public newLayer(tree: TreeNode): Observable<ConstellationNamesLayer> {
    return this.dataService.getConstellationsMetadata().pipe(
      map((rawMetadata: ConstellationMetadata[]) => {
        const labels = this.initRenderableLabels(tree.code, rawMetadata);
        return new ConstellationNamesLayer(tree, labels);
      })
    );
  }

  private initRenderableLabels(layer: string, rawMetadata: ConstellationMetadata[]): Map<string, RenderableText> {
    const renderableLabels = new Map<string, RenderableText>();
    rawMetadata.forEach(
      (constMeta: ConstellationMetadata) => {
        const renderable = this.toRenderableText(layer, constMeta);
        renderableLabels.set(constMeta.code, renderable);
      });
    return renderableLabels;
  }

  private toRenderableText(layer: string, constMeta: ConstellationMetadata): RenderableText {
    const center = toVector3(constMeta.ra, constMeta.dec, Constants.getWorldRadiusForLayer(layer));
    return new RenderableText(layer, 'labels', center, constMeta.names[0], TextOffsetPolicies.CENTERED);
  }

}
