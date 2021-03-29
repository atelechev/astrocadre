import { Layer } from 'src/app/modules/core/models/layer';

export const mockedLayers: Layer = {
  code: 'root',
  label: 'Root layer (hidden)',
  loadFromUrl: false,
  description: 'Hidden entry layer.',
  objects: [],
  subLayers: [
    {
      code: 'sky-grid',
      label: 'Coordinates grid',
      loadFromUrl: false,
      description: 'Celestial coordinates grid in degrees',
      objects: []
    },
    {
      code: 'stars',
      label: 'Stars',
      loadFromUrl: false,
      description: 'Stars visualisation and data',
      objects: [],
      subLayers: [
        {
          code: 'stars-mag2.0',
          label: 'Magnitude < 2.0',
          loadFromUrl: true,
          description: 'Stars of magnitude less or equal to 2.0',
          objects: []
        },
        {
          code: 'stars-mag2.5',
          label: 'Magnitude 2.0 <-> 2.5',
          loadFromUrl: true,
          description: 'Stars of magnitude between 2.0 and 2.5',
          objects: []
        },
        {
          code: 'stars-mag3.0',
          label: 'Magnitude 2.5 <-> 3.0',
          loadFromUrl: true,
          description: 'Stars of magnitude between 2.5 and 3.0',
          objects: []
        }
      ]
    },
    {
      code: 'constellations',
      label: 'Constellations',
      loadFromUrl: false,
      objects: [],
      subLayers: [
        {
          code: 'constellation-boundaries',
          label: 'Boundaries',
          loadFromUrl: true,
          objects: []
        },
        {
          code: 'constellation-lines',
          label: 'Lines',
          loadFromUrl: true,
          objects: []
        },
        {
          code: 'constellation-names',
          label: 'Names',
          loadFromUrl: true,
          objects: []
        }
      ]
    }
  ]
};
