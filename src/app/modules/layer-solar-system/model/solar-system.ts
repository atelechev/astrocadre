import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';

/**
 * Represents a renderable layer containing the Solar system objects.
 */
export class SolarSystem extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(model: Layer,) {
    super(model);
    this._objects = [];
  }

  public set ecliptic(ecliptic: LineSegments) {
    this._objects[0] = ecliptic;
  }

  public get objects(): Array<Object3D> {
    return this._objects.filter((obj: any) => !!obj);
  }

  public applyTheme(theme: Theme): void {
    // TODO
    const material = new LineBasicMaterial({ color: 'red' });
    if (this._objects.length > 0) {
      (this._objects[0] as LineSegments).material = material;
    }
    material.needsUpdate = true;
  }

}
