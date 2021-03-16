import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { Object3D, Points } from 'three';


export class Stars extends RenderableLayer {

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private readonly _magClass: number,
    private readonly _stars: Points,
    private readonly _properNameLabels: Map<string, RenderableText>,
    private readonly _standardNameLabels: Map<string, RenderableText>
  ) {
    super(model, materialsService, eventsService);
    this.subscribeThemeLoaded();
  }

  public get objects(): Array<Object3D> {
    return [this._stars];
  }

  // TODO texts

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
    // TODO
    // const styles = this.materialsService.getTextStyleForLayer(SupportedLayers.STARS);
    // [this._properNameLabels, this._standardNameLabels].forEach(
    //   (labels: Map<string, RenderableText>) => labels.forEach(
    //     (renderable: RenderableText, _: string) => renderable.applyStyles(styles)
    //   )
    // );
  }

}
