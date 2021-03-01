import { Observable } from 'rxjs';
import { TreeNode } from '#core/tree-node';
import { RenderableLayer } from '#core-layer/renderable-layer';

/**
 * Provides a method allowing to initialize a RenderableLayer.
 */
export interface LayerFactory<T extends RenderableLayer> {

  /**
   * Creates and returns a new layer wrapped into Observable.
   *
   * @param tree the tree node of the layer to create.
   */
  newLayer(tree: TreeNode): Observable<T>;

}
