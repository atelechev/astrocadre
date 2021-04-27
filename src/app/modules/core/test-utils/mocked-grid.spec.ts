import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { LineStyle } from '#core/models/theme/line-style';
import { RenderableText } from '#core/models/layers/renderable-text';
import { SkyGridStyle } from '#layer-sky-grid/models/theme/sky-grid-style';

export class MockedGrid extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    private readonly _referenceMeridian: LineSegments,
    private readonly _referenceParallel: LineSegments,
    private readonly _texts: Array<RenderableText>
  ) {
    super(model);
    this._objects = [
      this._referenceParallel,
      this._referenceMeridian
    ];
  }

  public get objects(): Array<Object3D> {
    return this._objects;
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public applyTheme(theme: Theme): void {
    const style = this.extractLayerStyle(theme) as SkyGridStyle;
    this.setReferenceLinesMaterial(style);
  }

  private setReferenceLinesMaterial(style: SkyGridStyle): void {
    const lines = [this._referenceParallel, this._referenceMeridian];
    this.setLineMaterials(style.reference, lines);
  }

  private setLineMaterials(lineStyle: LineStyle, lines: Array<LineSegments>): void {
    const material = new LineBasicMaterial({ color: lineStyle.color });
    lines.forEach(
      (line: LineSegments) => line.material = material
    );
    material.needsUpdate = true;
  }

}
