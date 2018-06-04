import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              private readonly boundaries: LineSegments) {
    super(tree);
    ensureArgDefined(boundaries, 'boundaries');
    this.objects = [ this.boundaries ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    const lineCommon = materials.get('line-common');
    this.boundaries.material = lineCommon;
    lineCommon.needsUpdate = true;
  }

}
