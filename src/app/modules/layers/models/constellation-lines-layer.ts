import { LineSegments, Object3D } from 'three';
import { RenderableLayer } from '#core/models/renderable-layer';
import { Theme } from '#core/models/theme';
import { TreeNode } from '#core/models/tree-node';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';

export class ConstellationLinesLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: TreeNode,
    private readonly lines: LineSegments) {
    super(tree);
    ensureArgDefined(lines, 'lines');
    this.objects = [this.lines];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    const material = materials.get('line-common');
    this.lines.material = material;
    material.needsUpdate = true;
  }

}
