import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

export class ConstellationLinesLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              private readonly lines: LineSegments) {
    super(tree);
    ensureArgDefined(lines, 'lines');
    this.objects = [ this.lines ];
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
