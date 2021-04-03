import { Theme } from '#core/models/theme';

export const themeDefault: Theme = {
  code: 'default',
  label: 'default',
  background: {
    color: 'rgb(0, 0, 0)'
  },
  skyGrid: {
    line: {
      common: 'rgb(0, 0, 0)',
      reference: 'rgb(0, 0, 0)'
    }
  },
  constellation: {
    boundaries: {
      line: {
        common: 'rgb(0, 0, 0)'
      }
    },
    lines: {
      line: {
        common: 'rgb(0, 0, 0)'
      }
    },
    names: {
      fontSize: '1px',
      fontFamily: 'arial',
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: 'rgb(0, 0, 0)'
    }
  },
  stars: {
    magnitudes: [],
    texture: {
      image: 'assets/textures/star_black.png',
      sizeMultiplier: 1
    },
    names: {
      proper: {
        fontSize: '1px',
        fontFamily: 'arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'rgb(0, 0, 0)'
      },
      standard: {
        fontSize: '1px',
        fontFamily: 'arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'rgb(0, 0, 0)'
      }
    }
  }
};
