import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedLines } from './geometry/merged-lines';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Constants } from '../core/constants';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

export class ConstellationLinesLayer extends RenderableLayer {

  private mergedLines: LineSegments;

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              rawSegments: number[][]) {
    super(tree);
    const offset = Constants.getWorldRadiusForLayer(Layers.CONSTELLATION_LINES);
    this.mergedLines = new MergedLines(rawSegments, offset).createObject3D();
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
