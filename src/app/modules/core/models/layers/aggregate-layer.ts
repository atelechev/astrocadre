import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';

/**
 * Reprensents an intermediate layer, which does not have its own
 * renderable objects, but has the role to group sub-layers together.
 */
export class AggregateLayer extends RenderableLayer {

  constructor(
    code: string,
    subLayers: Array<string>,
    label: string,
    description?: string
  ) {
    super(code, subLayers, label, description);
  }

  public applyTheme(_: Theme): void {
    // nothing
  }

}
