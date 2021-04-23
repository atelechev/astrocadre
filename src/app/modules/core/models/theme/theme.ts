import { CelestialBodyStyle } from '#core/models/theme/celestial-body-style';
import { LineStyle } from '#core/models/theme/line-style';
import { TextStyle } from '#core/models/theme/text-style';
import { TextureStyle } from '#core/models/theme/texture-style';
import { ThemeMeta } from '#core/models/theme/theme-meta';

/**
 * Represents a graphical theme.
 */
export interface Theme extends ThemeMeta {
  background: {
    color: string;
  };
  skyGrid: {
    normal: LineStyle;
    reference: LineStyle;
  };
  constellation: {
    boundaries: LineStyle;
    lines: LineStyle;
    names: TextStyle;
  };
  stars: {
    magnitudes: number[];
    texture: TextureStyle;
    names: {
      proper: TextStyle;
      standard: TextStyle;
    };
  };
  messier: {
    objects: {
      cluster: TextureStyle;
      galaxy: TextureStyle;
      nebula: TextureStyle;
      other: TextureStyle;
    };
    names: TextStyle;
  };
  solarSystem: {
    baseStyle: CelestialBodyStyle;
    sun?: CelestialBodyStyle;
    moon?: CelestialBodyStyle;
    mercury?: CelestialBodyStyle;
    venus?: CelestialBodyStyle;
    mars?: CelestialBodyStyle;
    jupiter?: CelestialBodyStyle;
    saturn?: CelestialBodyStyle;
    uranus?: CelestialBodyStyle;
    neptune?: CelestialBodyStyle;
    names: TextStyle;
  };
}
