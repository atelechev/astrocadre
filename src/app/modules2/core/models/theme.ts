import { TextStyle } from 'src/app/modules2/core/models/text-style';
import { ThemeMeta } from 'src/app/modules2/core/models/theme-meta';

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
