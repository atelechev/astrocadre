import { BackgroundStyle } from '#core/models/theme/background-style';
import { LayerStyle } from '#core/models/theme/layer-style';
import { ThemeMeta } from '#core/models/theme/theme-meta';

/**
 * Represents a graphical theme.
 */
export interface Theme extends ThemeMeta {
  background: BackgroundStyle;
  layers: Array<LayerStyle>;
}
