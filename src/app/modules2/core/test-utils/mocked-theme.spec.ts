import { Theme } from 'src/app/modules2/core/models/theme';

export const mockedTheme: Theme = {
  code: 'dev',
  label: 'Dev',
  background: {
    color: 'rgb(2, 0, 44)'
  },
  skyGrid: {
    line: {
      common: 'rgb(40, 33, 175)',
      reference: 'rgb(0, 255, 153)'
    }
  },
  constellation: {
    boundaries: {
      line: {
        common: 'rgb(94, 86, 239)'
      }
    },
    lines: {
      line: {
        common: 'rgb(255, 86, 239)'
      }
    },
    names: {
      fontSize: '28px',
      fontFamily: 'arial',
      fontStyle: 'italic',
      fontWeight: 'normal',
      color: 'red'
    }
  },
  stars: {
    magnitudes: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    texture: {
      image: 'assets/textures/star_yellow.png',
      sizeMultiplier: 2.5
    },
    names: {
      proper: {
        fontSize: '12px',
        fontFamily: 'arial',
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: 'orange'
      },
      standard: {
        fontSize: '11px',
        fontFamily: 'arial',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'orange'
      }
    }
  }
};
