
import {of as observableOf,  Observable } from 'rxjs';
import { LayerFactory } from './layer-factory';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

import { Injectable } from '@angular/core';

@Injectable()
export class RenderableLayerFactory implements LayerFactory<RenderableLayer> {

  public newLayer(tree: LayersTreeNode): Observable<RenderableLayer> {
    return observableOf(new RenderableLayer(tree));
  }

}
