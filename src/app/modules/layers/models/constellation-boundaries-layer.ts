import { LineSegments, Object3D } from 'three';
import { ensureArgDefined } from '#core/arg-validation-utils';
import { TreeNode } from '#core/tree-node';
import { RenderableLayer } from '#core-layer/renderable-layer';
import { Theme } from '#core-theme/theme';

export class ConstellationBoundariesLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: TreeNode,
    private readonly boundaries: LineSegments) {
    super(tree);
    ensureArgDefined(boundaries, 'boundaries');
    this.objects = [this.boundaries];
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
