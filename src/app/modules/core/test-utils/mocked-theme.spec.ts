import { Theme } from '#core/models/theme/theme';

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
      image: 'assets/textures/star_white.png',
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
  messier: {
    objects: {
      cluster: {
        image: 'assets/textures/messier_cluster_chart.png',
        sizeMultiplier: 2.5
      },
      galaxy: {
        image: 'assets/textures/messier_galaxy_chart.png',
        sizeMultiplier: 3
      },
      nebula: {
        image: 'assets/textures/messier_nebula_chart.png',
        sizeMultiplier: 2.5
      },
      other: {
        image: 'assets/textures/messier_cluster_chart.png',
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
  solarSystem: {
    sun: {
      texture: {
        image: 'assets/textures/sun_chart.png',
        sizeMultiplier: 5
      },
      ecliptic: {
        color: 'rgb(190, 190, 190)'
      }
    },
    moon: {
      texture: {
        image: 'assets/textures/moon_chart.png',
        sizeMultiplier: 4
      },
      path: {
        color: 'rgb(200, 200, 200)'
      }
    }
  }
};
