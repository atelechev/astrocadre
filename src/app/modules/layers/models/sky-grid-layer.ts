import { LineSegments, Material, Object3D } from 'three';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';
import { TreeNode } from '#core/models/tree-node';
import { RenderableLayer } from '#core/models/renderable-layer';
import { Theme } from '#core/models/theme';

export class SkyGridLayer extends RenderableLayer {

  private objects: Object3D[];

  constructor(tree: TreeNode,
    private readonly commonMeridians: LineSegments,
    private readonly commonParallels: LineSegments,
    private readonly referenceMeridian: LineSegments,
    private readonly referenceParallel: LineSegments) {
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

  protected useThemeForThis(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(this.getName());
    this.setCommonLinesMaterial(materials.get('line-common'));
    this.setReferenceLinesMaterial(materials.get('line-reference'));
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

}
