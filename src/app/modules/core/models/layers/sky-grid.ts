import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme';


export class SkyGrid extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    private readonly _commonMeridians: LineSegments,
    private readonly _commonParallels: LineSegments,
    private readonly _referenceMeridian: LineSegments,
    private readonly _referenceParallel: LineSegments
  ) {
    super(model);
    this._objects = [
      this._commonParallels,
      this._commonMeridians,
      this._referenceParallel,
      this._referenceMeridian
    ];
  }

  public get objects(): Array<Object3D> {
    return this._objects;
  }

  public applyTheme(theme: Theme): void {
    this.setCommonLinesMaterial(theme);
    this.setReferenceLinesMaterial(theme);
  }

  private setCommonLinesMaterial(theme: Theme): void {
    const lines = [this._commonParallels, this._commonMeridians];
    this.setLineMaterials(theme.skyGrid.line.common, lines);
  }

  private setReferenceLinesMaterial(theme: Theme): void {
    const lines = [this._referenceParallel, this._referenceMeridian];
    this.setLineMaterials(theme.skyGrid.line.reference, lines);
  }

  private setLineMaterials(color: string, lines: Array<LineSegments>): void {
    const material = new LineBasicMaterial({ color });
    lines.forEach(
      (line: LineSegments) => line.material = material
    );
    material.needsUpdate = true;
  }

}
