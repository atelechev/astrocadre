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
  image: 'assets/textures/theme_sky-chart/star.png',
  sizeMultiplier: 1
};

const defaultCelestialBody = {
  texture: defaultTexture,
  path: defaultLine
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
  layers: [
    {
      code: 'sky-grid',
      visibleOnLoad: false,
      normal: defaultLine,
      reference: defaultLine
    },
    {
      code: 'constellations',
      visibleOnLoad: false,
      boundaries: defaultLine,
      lines: defaultLine,
      names: defaultText
    },
    {
      code: 'stars',
      visibleOnLoad: false,
      magnitudes: [],
      texture: defaultTexture,
      names: {
        proper: defaultText,
        standard: defaultText
      }
    },
    {
      code: 'messier',
      visibleOnLoad: false,
      objects: {
        cluster: defaultTexture,
        galaxy: defaultTexture,
        nebula: defaultTexture,
        other: defaultTexture
      },
      names: defaultText
    },
    {
      code: 'solar-system',
      visibleOnLoad: false,
      baseStyle: defaultCelestialBody,
      names: defaultText
    }
  ]
};
