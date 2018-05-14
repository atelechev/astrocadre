import { Object3D, Material, LineSegments } from 'three';

import { RenderableLayer } from '../core/renderable-layer';
import { MergedAxialCurves } from './geometry/merged-axial-curves';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';
import { ItemsTreeNode } from '../core/items-tree-node';

export class SkyGridLayer extends RenderableLayer {

  private gridRadius = Constants.WORLD_RADIUS;

  private gridStepMeridians = 15;

  private gridStepParallels = 10;

  private absMeridianLineDeclination = 89;

  private commonMeridians: LineSegments;

  private commonParallels: LineSegments;

  private referenceMeridian: LineSegments;

  private referenceParallel: LineSegments;

  private objects: Object3D[];

  constructor(tree: ItemsTreeNode) {
    super(tree);
    this.commonMeridians = this.generateCommonMeridianSegments();
    this.commonParallels = this.generateCommonParallelSegments();
    this.referenceMeridian = this.generateReferenceMeridianSegments();
    this.referenceParallel = this.generateReferenceParallelSegments();
    this.objects = [
      this.commonParallels,
      this.commonMeridians,
      this.referenceParallel,
      this.referenceMeridian
    ];
  }

  private generateReferenceMeridianSegments(): LineSegments {
    const refSegments = [ this.meridianSegment(0), this.meridianSegment(180)];
    return new MergedAxialCurves(refSegments, this.gridRadius).toObject3D();
  }

  private meridianSegment(ra: number): number[] {
    return [ ra, this.absMeridianLineDeclination, ra, -this.absMeridianLineDeclination ];
  }

  private generateCommonMeridianSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let i = 0; i < 360; i += this.gridStepMeridians) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return new MergedAxialCurves(segments, this.gridRadius).toObject3D();
  }

  private parallelSegment(decl: number): number[] {
    return [ 0.01, decl, 359.99, decl ];
  }

  private generateReferenceParallelSegments(): LineSegments {
    const refSegments = [ this.parallelSegment(0) ];
    return new MergedAxialCurves(refSegments, this.gridRadius).toObject3D();
  }

  private generateCommonParallelSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let par = this.gridStepParallels; par < 90; par += this.gridStepParallels) {
      segments.push(this.parallelSegment(par));
      segments.push(this.parallelSegment(-par));
    }
    return new MergedAxialCurves(segments, this.gridRadius).toObject3D();
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
