import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/searchable';
import { EventsService } from '#core/services/events.service';
import { MaterialsService } from '#core/services/materials.service';


export class ConstellationNames extends RenderableLayer {

  private readonly _texts: Array<RenderableText>;

  private readonly _searchables: Array<Searchable>;

  constructor(
    model: Layer,
    materialsService: MaterialsService,
    eventsService: EventsService,
    private _renderableLabels: Map<string, RenderableText>
  ) {
    super(model, materialsService, eventsService);
    this._texts = Array.from(this._renderableLabels.values());
    this._searchables = this.model.objects;
    this.subscribeThemeChanged();
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public get renderableLabels(): Map<string, RenderableText> {
    return this._renderableLabels;
  }

  protected applyTheme(): void {
    const styles = this.materialsService.getTextStyleForLayer(this.code);
    this._texts.forEach(
      (renderable: RenderableText) => renderable.applyStyles(styles)
    );
  }

}
