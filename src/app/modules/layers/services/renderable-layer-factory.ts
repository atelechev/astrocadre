import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { LayerFactory } from '#layers/services/layer-factory';
import { TreeNode } from '#core/tree-node';

import { RenderableLayer } from '#core-layer/renderable-layer';

@Injectable()
export class RenderableLayerFactory implements LayerFactory<RenderableLayer> {

  public newLayer(tree: TreeNode): Observable<RenderableLayer> {
    return observableOf(new RenderableLayer(tree));
  }

}
