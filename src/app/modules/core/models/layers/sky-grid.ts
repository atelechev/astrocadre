import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { LineStyle } from '#core/models/theme/line-style';

/**
 * Represents a renderable layer containing the celestial coordinates grid.
 */
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
    this.setNormalLinesMaterial(theme);
    this.setReferenceLinesMaterial(theme);
  }

  private setNormalLinesMaterial(theme: Theme): void {
    const lines = [this._commonParallels, this._commonMeridians];
    this.setLineMaterials(theme.skyGrid.normal, lines);
  }

  private setReferenceLinesMaterial(theme: Theme): void {
    const lines = [this._referenceParallel, this._referenceMeridian];
    this.setLineMaterials(theme.skyGrid.reference, lines);
  }

  private setLineMaterials(lineStyle: LineStyle, lines: Array<LineSegments>): void {
    const material = new LineBasicMaterial({ color: lineStyle.color });
    lines.forEach(
      (line: LineSegments) => line.material = material
    );
    material.needsUpdate = true;
  }

}
