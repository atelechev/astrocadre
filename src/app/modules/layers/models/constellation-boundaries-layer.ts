import { LineSegments, Object3D } from 'three';
import { RenderableLayer } from '#core/models/renderable-layer';
import { Theme } from '#core/models/theme';
import { TreeNode } from '#core/models/tree-node';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';

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
