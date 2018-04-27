import { Object3D, Material, LineSegments } from 'three';

import { RenderableLayer } from '../core/renderable-layer';
import { MergedAxialCurves } from './geometry/merged-axial-curves';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';

export class SkyGridLayer extends RenderableLayer {

  private gridRadius = 2;

  private gridStep = 10;

  private absMeridianLineDeclination = 89.5;

  private commonMeridians: LineSegments;

  private commonParallels: LineSegments;

  private referenceMeridian: LineSegments;

  private referenceParallel: LineSegments;

  private objects: Object3D[];

  constructor() {
    super();
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
    return <LineSegments> new MergedAxialCurves(refSegments, this.gridRadius).toObject3D();
  }

  private meridianSegment(ra: number): number[] {
    return [ ra, this.absMeridianLineDeclination, ra, -this.absMeridianLineDeclination ];
  }

  private generateCommonMeridianSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let i = 0; i < 360; i += this.gridStep) {
      if (i === 0 || i === 180) {
        continue;
      }
      segments.push(this.meridianSegment(i));
    }
    return <LineSegments> new MergedAxialCurves(segments, this.gridRadius).toObject3D();
  }

  private parallelSegment(decl: number): number[] {
    return [ 0.01, decl, 359.99, decl ];
  }

  private generateReferenceParallelSegments(): LineSegments {
    const refSegments = [ this.parallelSegment(0) ];
    return <LineSegments> new MergedAxialCurves(refSegments, this.gridRadius).toObject3D();
  }

  private generateCommonParallelSegments(): LineSegments {
    const segments = new Array<number[]>();
    for (let par = this.gridStep; par < 90; par += this.gridStep) {
      segments.push(this.parallelSegment(par));
      segments.push(this.parallelSegment(-par));
    }
    return <LineSegments> new MergedAxialCurves(segments, this.gridRadius).toObject3D();
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  public getName(): string {
    return 'coordinates grid';
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

  public useTheme(theme: Theme): void {
    const materials = theme.getMaterialsForLayer(Layers.sky_grid);
    this.setCommonLinesMaterial(materials.get('line-common'));
    this.setReferenceLinesMaterial(materials.get('line-reference'));
  }

}
