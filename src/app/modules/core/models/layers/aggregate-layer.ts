import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';

/**
 * Reprensents an intermediate layer, which does not have its own
 * renderable objects, but has the role to group sub-layers together.
 */
export class AggregateLayer extends RenderableLayer {

  constructor(model: Layer) {
    super(model);
  }

  public applyTheme(_: Theme): void {
    // nothing
  }

}
