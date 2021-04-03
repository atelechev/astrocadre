import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { ThemeService } from '#core/services/theme.service';
import { Theme } from '#core/models/theme';


export class ConstellationLines extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    themeService: ThemeService,
    private readonly _lines: LineSegments
  ) {
    super(model, themeService);
    this._objects = [
      this._lines
    ];
    this.subscribeThemeChanged();
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  public applyTheme(theme: Theme): void {
    const material = new LineBasicMaterial({ color: theme.constellation.lines.line.common });
    this._lines.material = material;
    material.needsUpdate = true;
  }

}
