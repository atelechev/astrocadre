
import { of as observableOf, Observable } from 'rxjs';
import { LayerFactory } from './layer-factory';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { TreeNode } from '../core/tree-node';
import { Injectable } from '@angular/core';

@Injectable()
export class RenderableLayerFactory implements LayerFactory<RenderableLayer> {

  public newLayer(tree: TreeNode): Observable<RenderableLayer> {
    return observableOf(new RenderableLayer(tree));
  }

}
