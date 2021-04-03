import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme';

export class ConstellationBoundaries extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    private readonly _boundaries: LineSegments
  ) {
    super(model);
    this._objects = [
      this._boundaries
    ];
  }

  // FIXME the lines are rendered with an error offset on the longitudinal axis!
  public get objects(): Object3D[] {
    return this._objects;
  }

  public applyTheme(theme: Theme): void {
    const material = new LineBasicMaterial({ color: theme.constellation.boundaries.line.common });
    this._boundaries.material = material;
    material.needsUpdate = true;
  }

}
