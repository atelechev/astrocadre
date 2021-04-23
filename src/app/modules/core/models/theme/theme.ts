import { BackgroundStyle } from '#core/models/theme/background-style';
import { ConstellationStyle } from '#core/models/theme/constellation-style';
import { MessierObjectsStyle } from '#core/models/theme/messier-objects-style';
import { SkyGridStyle } from '#core/models/theme/sky-grid-style';
import { SolarSystemStyle } from '#core/models/theme/solar-system-style';
import { StarsStyle } from '#core/models/theme/stars-style';
import { ThemeMeta } from '#core/models/theme/theme-meta';

/**
 * Represents a graphical theme.
 */
export interface Theme extends ThemeMeta {
  background: BackgroundStyle;
  skyGrid: SkyGridStyle;
  constellation: ConstellationStyle;
  stars: StarsStyle;
  messier: MessierObjectsStyle;
  solarSystem: SolarSystemStyle;
}
