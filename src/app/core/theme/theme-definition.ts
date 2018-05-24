import { TextStyle } from '../text-style';

export interface ThemeDefinition {

  name: string;
  background: {
    color: string;
  };
  skyGrid: {
    line: {
      common: string;
      reference: string;
    }
  };
  constellation: {
    boundaries: {
      line: {
        common: string;
      }
    };
    lines: {
      line: {
        common: string;
      }
    };
    names: TextStyle;
  };
  stars: {
    magnitudes: number[];
    texture: {
      image: string;
      sizeMultiplier: number;
    },
    names: {
      proper: TextStyle;
      standard: TextStyle;
    }
  };

}
