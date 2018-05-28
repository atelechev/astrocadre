import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D } from 'three';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

export class StarsLayer extends RenderableLayer {

  constructor(tree: LayersTreeNode) {
    super(tree);
  }

  public getObjects(): Object3D[] {
    return [];
  }

  protected useThemeForThis(theme: Theme): void {
    // nothing
  }

}
