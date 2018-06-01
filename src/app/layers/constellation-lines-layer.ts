import { RenderableLayer } from '../core/layer/renderable-layer';
import { Object3D, LineSegments } from 'three';
import { LinesFactory } from './geometry/lines-factory';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme/theme';
import { Constants } from '../core/constants';
import { LayersTreeNode } from '../core/layer/layers-tree-node';

export class ConstellationLinesLayer extends RenderableLayer {

  private mergedLines: LineSegments;

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              rawSegments: number[][],
              objectsFactory: LinesFactory) {
    super(tree);
    this.mergedLines = objectsFactory.createObject3D(Layers.CONSTELLATION_LINES, rawSegments);
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
