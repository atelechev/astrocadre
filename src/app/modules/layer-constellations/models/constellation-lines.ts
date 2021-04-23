import { LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { buildAndAssignMaterial, buildLineMaterial } from '#core/utils/material-utils';

/**
 * Represents a renderable layer containing the constellations lines.
 */
export class ConstellationLines extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    private readonly _lines: LineSegments
  ) {
    super(model);
    this._objects = [
      this._lines
    ];
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  public applyTheme(theme: Theme): void {
    buildAndAssignMaterial(() => buildLineMaterial(theme.constellation.lines), this._lines);
  }

}
