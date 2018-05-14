import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedLines } from './geometry/merged-lines';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';
import { ItemsTreeNode } from '../core/items-tree-node';

export class ConstellationLinesLayer extends RenderableLayer {

  private mergedLines: LineSegments;

  private objects: Object3D[];

  constructor(tree: ItemsTreeNode,
              rawSegments: number[][]) {
    super(tree);
    this.mergedLines = new MergedLines(rawSegments, Constants.WORLD_RADIUS - 0.02).toObject3D();
    this.objects = [ this.mergedLines ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    const material = materials.get('line-common');
    this.mergedLines.material = material;
    material.needsUpdate = true;
  }

}
