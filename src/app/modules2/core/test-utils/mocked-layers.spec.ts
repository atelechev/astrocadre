import { Layer } from 'src/app/modules2/core/models/layer';

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
        }
      ]
    }
  ]
};
