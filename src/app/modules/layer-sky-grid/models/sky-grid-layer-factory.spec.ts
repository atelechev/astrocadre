import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { SkyGridLayerFactory } from '#layer-sky-grid/models/sky-grid-layer-factory';


describe('SkyGridLayerFactory', () => {

  const model = {
    code: 'sky-grid',
    label: 'Coordinates grid',
    loadFromUrl: false,
    objects: []
  };
  let factory: LayerFactory;

  beforeEach(() => {
    factory = new SkyGridLayerFactory(new AxialCurvesFactory());
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer(model);
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(4);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  });

});
