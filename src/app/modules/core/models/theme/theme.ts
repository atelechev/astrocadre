import { LineStyle } from '#core/models/theme/line-style';
import { TextStyle } from '#core/models/theme/text-style';
import { ThemeMeta } from '#core/models/theme/theme-meta';

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
