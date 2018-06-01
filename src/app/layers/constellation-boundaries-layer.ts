import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { MergedAxialCurves } from './geometry/merged-axial-curves';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Constants } from '../core/constants';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private mergedCurves: LineSegments;

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              rawSegments: number[][]) {
    super(tree);
    this.mergedCurves = new MergedAxialCurves(rawSegments, Constants.WORLD_RADIUS - 0.02).createObject3D();
    this.objects = [ this.mergedCurves ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    const lineCommon = materials.get('line-common');
    this.mergedCurves.material = lineCommon;
    lineCommon.needsUpdate = true;
  }

}
