import { LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Materials } from '#core/models/materials';
import { MaterialsService } from '#core/services/materials.service';
import { ThemeService } from '#core/services/theme.service';


export class ConstellationLines extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    themeService: ThemeService,
    private readonly _lines: LineSegments
  ) {
    super(model, materialsService, themeService);
    this._objects = [
      this._lines
    ];
    this.subscribeThemeChanged();
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  protected applyTheme(): void {
    const materials = this.materialsService.getMaterialsForLayer(this.code);
    const material = materials.get(Materials.LINE_COMMON);
    this._lines.material = material;
    material.needsUpdate = true;
  }

}
