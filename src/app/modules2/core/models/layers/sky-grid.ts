import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { LineSegments, Material, Object3D } from 'three';


export class SkyGrid extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private readonly _commonMeridians: LineSegments,
    private readonly _commonParallels: LineSegments,
    private readonly _referenceMeridian: LineSegments,
    private readonly _referenceParallel: LineSegments
  ) {
    super(model, materialsService, eventsService);
    this._objects = [
      this._commonParallels,
      this._commonMeridians,
      this._referenceParallel,
      this._referenceMeridian
    ];
    this.subscribeThemeLoaded();
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  protected applyTheme(): void {
    const materials = this.materialsService.getMaterialsForLayer(this.code);
    this.setCommonLinesMaterial(materials.get('line-common')); // TODO extract constants
    this.setReferenceLinesMaterial(materials.get('line-reference'));
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
