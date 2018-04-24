
export interface ThemeDefinition {

  name: string;
  background: {
    color: string;
  };
  skyGrid: {
    line: {
      common: string;
      reference: string
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
        common: string
      }
    }
  };
  stars: {
    magnitudes: number[];
    texture: {
      image: string;
      sizeMultiplier: number;
    }
  };

}
