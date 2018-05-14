import { RenderableLayer } from '../core/renderable-layer';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';
import { Points, Object3D } from 'three';
import { MergedPoints } from './geometry/merged-points';
import { ItemsTreeNode } from '../core/items-tree-node';

export class StarsMagnitudeLayer extends RenderableLayer {

  private stars: Points;

  constructor(tree: ItemsTreeNode,
              public readonly magClass: number,
              rawStars: number[][]) {
    super(tree);
    this.stars = new MergedPoints(rawStars, Constants.WORLD_RADIUS - 0.04).toObject3D();
  }

  public useThemeForThis(theme: Theme): void {
    const materialKey = 'star-' + this.magClass.toFixed(1);
    const material = theme.getMaterialForLayer(Layers.STARS, materialKey);
    this.stars.material = material;
    material.needsUpdate = true;
  }

  public getObjects(): Array<Object3D> {
    return [ this.stars ];
  }

}
