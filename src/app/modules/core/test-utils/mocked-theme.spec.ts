import { Theme } from '#core/models/theme/theme';

export const mockedTheme: Theme = {
  code: 'dev',
  label: 'Dev',
  background: {
    color: 'rgb(2, 0, 44)'
  },
  layers: [
    {
      code: 'sky-grid',
      visibleOnLoad: true,
      normal: {
        color: 'rgb(40, 33, 175)'
      },
      reference: {
        color: 'rgb(0, 255, 153)'
      }
    },
    {
      code: 'constellations',
      visibleOnLoad: true,
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
    {
      code: 'stars',
      visibleOnLoad: true,
      magnitudes: [2, 2.5, 3],
      texture: {
        image: 'assets/textures/theme_tiny/star.png',
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
    },
    {
      code: 'messier',
      visibleOnLoad: true,
      objects: {
        cluster: {
          image: 'assets/textures/theme_sky-chart/messier_cluster.png',
          sizeMultiplier: 2.5
        },
        galaxy: {
          image: 'assets/textures/theme_sky-chart/messier_galaxy.png',
          sizeMultiplier: 3
        },
        nebula: {
          image: 'assets/textures/theme_sky-chart/messier_nebula.png',
          sizeMultiplier: 2.5
        },
        other: {
          image: 'assets/textures/theme_sky-chart/messier_cluster.png',
          sizeMultiplier: 1
        }
      },
      names: {
        fontSize: '13px',
        fontFamily: 'arial',
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: 'black'
      }
    },
    {
      code: 'solar-system',
      visibleOnLoad: true,
      baseStyle: {
        texture: {
          image: 'assets/textures/theme_night-view/star.png',
          sizeMultiplier: 1.5
        },
        path: {
          color: 'rgb(200, 200, 200)'
        }
      },
      sun: {
        texture: {
          image: 'assets/textures/theme_sky-chart/sun.png',
          sizeMultiplier: 5
        },
        path: {
          color: 'rgb(190, 190, 190)',
          width: 2
        }
      },
      moon: {
        texture: {
          image: 'assets/textures/theme_sky-chart/moon.png',
          sizeMultiplier: 4
        },
        path: {
          color: 'rgb(200, 200, 200)',
          width: 3
        }
      },
      names: {
        fontSize: '13px',
        fontFamily: 'arial',
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: 'black'
      }
    }
  ]
};
