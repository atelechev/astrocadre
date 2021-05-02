import { LineSegments, Object3D } from 'three';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { LineStyle } from '#core/models/theme/line-style';
import { buildLineMaterial } from '#core/utils/material-utils';
import { SkyGridStyle } from '#layer-sky-grid/models/theme/sky-grid-style';

/**
 * Represents a renderable layer containing the celestial coordinates grid.
 */
export class SkyGrid extends RenderableLayer {

  public static readonly CODE = 'sky-grid';

  private _objects: Array<Object3D>;

  constructor(
    private readonly _commonMeridians: LineSegments,
    private readonly _commonParallels: LineSegments,
    private readonly _referenceMeridian: LineSegments,
    private readonly _referenceParallel: LineSegments
  ) {
    super(
      SkyGrid.CODE,
      [],
      'Coordinates grid',
      'Celestial coordinates grid in degrees'
    );
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
    const style = this.extractStyle(theme) as SkyGridStyle;
    this.setNormalLinesMaterial(style);
    this.setReferenceLinesMaterial(style);
  }

  private setNormalLinesMaterial(style: SkyGridStyle): void {
    const lines = [this._commonParallels, this._commonMeridians];
    this.setLineMaterials(style.normal, lines);
  }

  private setReferenceLinesMaterial(style: SkyGridStyle): void {
    const lines = [this._referenceParallel, this._referenceMeridian];
    this.setLineMaterials(style.reference, lines);
  }

  private setLineMaterials(lineStyle: LineStyle, lines: Array<LineSegments>): void {
    const material = buildLineMaterial(lineStyle);
    lines.forEach(
      (line: LineSegments) => line.material = material
    );
    material.needsUpdate = true;
  }

}
