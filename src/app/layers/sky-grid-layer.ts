import { Object3D, Material, LineSegments } from 'three';
import { RenderableLayer } from '../core/layer/renderable-layer';
import { Theme } from '../core/theme/theme';
import { LayersTreeNode } from '../core/layer/layers-tree-node';
import { ensureArgDefined } from '../core/layer/arg-validation-utils';

export class SkyGridLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: LayersTreeNode,
              private commonMeridians: LineSegments,
              private commonParallels: LineSegments,
              private referenceMeridian: LineSegments,
              private referenceParallel: LineSegments) {
    super(tree);
    ensureArgDefined(commonMeridians, 'commonMeridians');
    ensureArgDefined(commonParallels, 'commonParallels');
    ensureArgDefined(referenceMeridian, 'referenceMeridian');
    ensureArgDefined(referenceParallel, 'referenceParallel');
    this.objects = [
      this.commonParallels,
      this.commonMeridians,
      this.referenceParallel,
      this.referenceMeridian
    ];
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  private setCommonLinesMaterial(material: Material): void {
    this.commonParallels.material = material;
    this.commonMeridians.material = material;
    material.needsUpdate = true;
  }

  private setReferenceLinesMaterial(material: Material): void {
    this.referenceParallel.material = material;
    this.referenceMeridian.material = material;
    material.needsUpdate = true;
  }

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    this.setCommonLinesMaterial(materials.get('line-common'));
    this.setReferenceLinesMaterial(materials.get('line-reference'));
  }

}
