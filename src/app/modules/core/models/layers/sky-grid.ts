import { LineSegments, Material, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Materials } from '#core/models/materials';
import { MaterialsService } from '#core/services/materials.service';
import { ThemeService } from '#core/services/theme.service';


export class SkyGrid extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    themeService: ThemeService,
    private readonly _commonMeridians: LineSegments,
    private readonly _commonParallels: LineSegments,
    private readonly _referenceMeridian: LineSegments,
    private readonly _referenceParallel: LineSegments
  ) {
    super(model, materialsService, themeService);
    this._objects = [
      this._commonParallels,
      this._commonMeridians,
      this._referenceParallel,
      this._referenceMeridian
    ];
    this.subscribeThemeChanged();
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  protected applyTheme(): void {
    const materials = this.materialsService.getMaterialsForLayer(this.code);
    this.setCommonLinesMaterial(materials.get(Materials.LINE_COMMON));
    this.setReferenceLinesMaterial(materials.get(Materials.LINE_REFERENCE));
  }

  private setCommonLinesMaterial(material: Material): void {
    this._commonParallels.material = material;
    this._commonMeridians.material = material;
    material.needsUpdate = true;
  }

  private setReferenceLinesMaterial(material: Material): void {
    this._referenceParallel.material = material;
    this._referenceMeridian.material = material;
    material.needsUpdate = true;
  }

}
