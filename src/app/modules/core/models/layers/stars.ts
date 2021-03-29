import { Object3D, Points } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/searchable';
import { SupportedLayers } from '#core/models/supported-layers';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';


export class Stars extends RenderableLayer {

  private _properNamesShown: boolean;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private readonly _magClass: number,
    private readonly _stars: Points,
    private readonly _properNames: Array<RenderableText>,
    private readonly _standardNames: Array<RenderableText>,
    private readonly _searchables: Array<Searchable>
  ) {
    super(model, materialsService, eventsService);
    this.subscribeThemeChanged();
    this.showProperNames();
  }

  public get magnitudeClass(): number {
    return this._magClass;
  }

  public get objects(): Array<Object3D> {
    return [this._stars];
  }

  public get texts(): Array<RenderableText> {
    return this._properNamesShown ? this._properNames : this._standardNames;
  }

  public get properNamesShown(): boolean {
    return this._properNamesShown;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public showProperNames(): void {
    this._properNamesShown = true;
  }

  public showStandardNames(): void {
    this._properNamesShown = false;
  }

  protected applyTheme(): void {
    this.useThemeForObjects();
    this.useThemeForLabels();
  }

  private useThemeForObjects(): void {
    const materialKey = 'star-' + this._magClass.toFixed(1);
    const material = this.materialsService
      .getMaterialsForLayer(SupportedLayers.STARS)
      .get(materialKey);
    if (material) {
      this._stars.material = material;
      material.needsUpdate = true;
    }
  }

  private useThemeForLabels(): void {
    const styles = this.materialsService.getTextStyleForLayer(SupportedLayers.STARS);
    [this._properNames, this._standardNames].forEach(
      (labels: Array<RenderableText>) => labels.forEach(
        (renderable: RenderableText) => renderable.applyStyles(styles)
      )
    );
  }

}
