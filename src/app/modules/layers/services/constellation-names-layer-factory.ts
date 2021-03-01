import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstellationNamesLayer } from '#layers/models/constellation-names-layer';
import { LayerFactory } from '#layers/services/layer-factory';
import { Constants } from '#core/models/constants';
import { StaticDataService } from '#core/services/static-data.service';
import { TreeNode } from '#core/models/tree-node';
import { ConstellationMetadata } from '#core/models/constellation-metadata';
import { RenderableText } from '#core/models/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { TextOffsetPolicies } from '#core/models/text-offset-policy';

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
