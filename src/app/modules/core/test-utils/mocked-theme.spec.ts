import { Theme } from '#core/models/theme';

export const mockedTheme: Theme = {
  code: 'dev',
  label: 'Dev',
  background: {
    color: 'rgb(2, 0, 44)'
  },
  skyGrid: {
    normal: {
      color: 'rgb(40, 33, 175)'
    },
    reference: {
      color: 'rgb(0, 255, 153)'
    }
  },
  constellation: {
    boundaries: {
      color: 'rgb(94, 86, 239)'
    },
    lines: {
      color: 'rgb(255, 86, 239)'
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
    magnitudes: [2, 2.5, 3],
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
