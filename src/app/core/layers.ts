

export class Layers {

  public static readonly SKY_GRID = 'sky-grid';

  public static readonly CONSTELLATIONS = 'constellations';

  public static readonly CONSTELLATION_BOUNDARIES = 'constellation-boundaries';

  public static readonly CONSTELLATION_LINES = 'constellation-lines';

  public static readonly CONSTELLATION_NAMES = 'constellation-names';

  public static readonly STARS = 'stars';

  public static readonly TEXT_LAYERS = [
    Layers.CONSTELLATION_NAMES
  ];

  public static readonly OBJECT_LAYERS = [
    Layers.SKY_GRID,
    Layers.CONSTELLATIONS,
    Layers.STARS
  ];

}
