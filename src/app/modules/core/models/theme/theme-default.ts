import { Theme } from '#core/models/theme/theme';

/**
 * The default theme data loaded in the application before
 * a normal theme is loaded.
 *
 * This definition is preferrable to using an undefined theme.
 *
 * The values defined in this theme are not relevant, because
 * they are replaced quickly by a loaded theme during the app
 * init sequence.
 */
export const themeDefault: Theme = {
  code: 'default',
  label: 'default',
  background: {
    color: 'rgb(0, 0, 0)'
  },
  skyGrid: {
    normal: {
      color: 'rgb(0, 0, 0)'
    },
    reference: {
      color: 'rgb(0, 0, 0)'
    }
  },
  constellation: {
    boundaries: {
      color: 'rgb(0, 0, 0)'
    },
    lines: {
      color: 'rgb(0, 0, 0)'
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
