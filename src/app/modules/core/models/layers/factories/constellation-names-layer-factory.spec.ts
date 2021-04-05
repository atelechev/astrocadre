import { ConstellationNamesLayerFactory } from '#core/models/layers/factories/constellation-names-layer-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';


describe('ConstellationNamesLayerFactory', () => {

  const model = {
    code: 'constellation-names',
    label: 'Names',
    loadFromUrl: true,
    objects: [
      { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'Andromeda'] }
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    factory = new ConstellationNamesLayerFactory(model);
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(0);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  });

});
