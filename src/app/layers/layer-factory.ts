import { RenderableLayer } from '../core/layer/renderable-layer';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { Observable } from 'rxjs';

/**
 * Provides a method allowing to initialize a RenderableLayer.
 */
export interface LayerFactory<T extends RenderableLayer> {

  /**
   * Creates and returns a new layer wrapped into Observable.
   * @param tree the tree node of the layer to create.
   */
  newLayer(tree: LayersTreeNode): Observable<T>;

}
