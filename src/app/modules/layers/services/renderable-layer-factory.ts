import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { RenderableLayer } from '#core/models/renderable-layer';
import { TreeNode } from '#core/models/tree-node';
import { LayerFactory } from '#layers/services/layer-factory';


@Injectable()
export class RenderableLayerFactory implements LayerFactory<RenderableLayer> {

  public newLayer(tree: TreeNode): Observable<RenderableLayer> {
    return observableOf(new RenderableLayer(tree));
  }

}
