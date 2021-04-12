import { Theme } from '#core/models/theme/theme';

const defaultText = {
  fontSize: '1px',
  fontFamily: 'arial',
  fontStyle: 'normal',
  fontWeight: 'normal',
  color: 'rgb(0, 0, 0)'
};

const defaultLine = {
  color: 'rgb(0, 0, 0)'
};

const defaultTexture = {
  image: 'assets/textures/star_black.png',
  sizeMultiplier: 1
};

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
  background: defaultLine,
  skyGrid: {
    normal: defaultLine,
    reference: defaultLine
  },
  constellation: {
    boundaries: defaultLine,
    lines: defaultLine,
    names: defaultText
  },
  stars: {
    magnitudes: [],
    texture: defaultTexture,
    names: {
      proper: defaultText,
      standard: defaultText
    }
  },
  messier: {
    objects: {
      cluster: defaultTexture,
      galaxy: defaultTexture,
      nebula: defaultTexture,
      other: defaultTexture
    },
    names: defaultText
  }
};
