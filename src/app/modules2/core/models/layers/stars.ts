import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { Object3D, Points } from 'three';


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
    this.subscribeThemeLoaded();
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
