import { LayerFactory } from './layer-factory';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
export class RenderableLayerFactory implements LayerFactory<RenderableLayer> {

  public newLayer(tree: LayersTreeNode): Observable<RenderableLayer> {
    return Observable.of(new RenderableLayer(tree));
  }

}
