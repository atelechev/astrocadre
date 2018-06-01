import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { AxialCurvesFactory } from './geometry/axial-curves-factory';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private mergedCurves: LineSegments;

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              rawSegments: number[][],
              objectsFactory: AxialCurvesFactory) {
    super(tree);
    this.mergedCurves = objectsFactory.createObject3D(Layers.CONSTELLATION_BOUNDARIES, rawSegments);
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
