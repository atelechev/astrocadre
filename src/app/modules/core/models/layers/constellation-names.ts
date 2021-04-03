import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/searchable';
import { Theme } from '#core/models/theme';
import { ThemeService } from '#core/services/theme.service';


export class ConstellationNames extends RenderableLayer {

  private readonly _texts: Array<RenderableText>;

  private readonly _searchables: Array<Searchable>;

  constructor(
    model: Layer,
    themeService: ThemeService,
    private _renderableLabels: Map<string, RenderableText>
  ) {
    super(model, themeService);
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

  public applyTheme(theme: Theme): void {
    const style = theme.constellation.names;
    this._texts.forEach(
      (renderable: RenderableText) => renderable.applyStyle(style)
    );
  }

}
