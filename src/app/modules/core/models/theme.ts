import { TextStyle } from 'src/app/modules/core/models/text-style';
import { ThemeMeta } from 'src/app/modules/core/models/theme-meta';

// TODO simplify the config for lines. Use 'line: string;' for most, and 'regular' and 'reference' for skyGrid.
export interface Theme extends ThemeMeta {
  background: {
    color: string;
  };
  skyGrid: {
    line: {
      common: string;
      reference: string;
    };
  };
  constellation: {
    boundaries: {
      line: {
        common: string;
      };
    };
    lines: {
      line: {
        common: string;
      };
    };
    names: TextStyle;
  };
  stars: {
    magnitudes: number[];
    texture: {
      image: string;
      sizeMultiplier: number;
    };
    names: {
      proper: TextStyle;
      standard: TextStyle;
    };
  };
}
