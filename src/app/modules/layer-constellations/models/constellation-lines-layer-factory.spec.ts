import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationLinesLayerFactory } from '#layer-constellations/models/constellation-lines-layer-factory';
import { LayerFactory } from '#core/models/layers/factories/layer-factory';


describe('ConstellationLinesLayerFactory', () => {

  const model = {
    code: 'constellation-lines',
    label: 'Lines',
    loadFromUrl: false,
    objects: [
      [72.46, 6.95, 72.65, 8.9],
      [72.8, 5.6, 72.46, 6.95],
      [73.56, 2.45, 72.8, 5.6],
      [74.64, 1.72, 73.56, 2.45]
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    factory = new ConstellationLinesLayerFactory(model, new AxialCurvesFactory());
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  });

});
