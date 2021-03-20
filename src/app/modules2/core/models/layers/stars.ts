import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { Object3D, Points } from 'three';


export class Stars extends RenderableLayer {

  private readonly _properNames: Array<RenderableText>;

  private readonly _standardNames: Array<RenderableText>;

  private _properNamesShown: boolean;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private readonly _magClass: number,
    private readonly _stars: Points,
    private readonly _properNameLabels: Map<string, RenderableText>, // TODO it should be ok to use Array<RenderableText>
    private readonly _standardNameLabels: Map<string, RenderableText>
  ) {
    super(model, materialsService, eventsService);
    this._properNames = Array.from(this._properNameLabels.values());
    this._standardNames = Array.from(this._standardNameLabels.values());
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
