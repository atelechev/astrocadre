import { RenderableLayer } from '../core/layer/renderable-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export interface LayerFactory<T extends RenderableLayer> {

  newLayer(tree: LayersTreeNode, ...args: any[]): Observable<T>;

}
