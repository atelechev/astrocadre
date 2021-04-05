import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';

/**
 * Represents a renderable layer containing the names of the constellations.
 */
export class ConstellationNames extends RenderableLayer {

  private readonly _searchables: Array<Searchable>;

  constructor(
    model: Layer,
    private readonly _texts: Array<RenderableText>
  ) {
    super(model);
    this._searchables = model.objects;
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public applyTheme(theme: Theme): void {
    const style = theme.constellation.names;
    this._texts.forEach(
      (renderable: RenderableText) => renderable.applyStyle(style)
    );
  }

}
