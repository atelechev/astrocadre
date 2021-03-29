import { LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Materials } from '#core/models/materials';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';

export class ConstellationBoundaries extends RenderableLayer {

  private _objects: Array<Object3D>;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private readonly _boundaries: LineSegments
  ) {
    super(model, materialsService, eventsService);
    this._objects = [
      this._boundaries
    ];
    this.subscribeThemeChanged();
  }

  // FIXME the lines are rendered with an error offset on the longitudinal axis!
  public get objects(): Object3D[] {
    return this._objects;
  }

  protected applyTheme(): void {
    const materials = this.materialsService.getMaterialsForLayer(this.code);
    const lineCommon = materials.get(Materials.LINE_COMMON);
    this._boundaries.material = lineCommon;
    lineCommon.needsUpdate = true;
  }

}