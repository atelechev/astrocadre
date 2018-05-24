import { RenderableLayer } from '../core/renderable-layer';
import { Object3D } from 'three';
import { Theme } from '../core/theme/theme';
import { ItemsTreeNode } from '../core/items-tree-node';

export class StarsLayer extends RenderableLayer {

  constructor(tree: ItemsTreeNode) {
    super(tree);
  }

  public getObjects(): Object3D[] {
    return [];
  }

  protected useThemeForThis(theme: Theme): void {
    // nothing
  }

}
