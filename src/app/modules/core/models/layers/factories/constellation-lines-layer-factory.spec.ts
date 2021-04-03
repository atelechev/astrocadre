import { Layer } from '#core/models/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationLinesLayerFactory } from '#core/models/layers/factories/constellation-lines-layer-factory';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('ConstellationLinesLayerFactory', () => {

  let ctx: TestContext;
  let factory: ConstellationLinesLayerFactory;

  beforeEach(() => {
    ctx = new TestContext().configure();
  });

  const newFactory = (model: Layer): ConstellationLinesLayerFactory => (
    new ConstellationLinesLayerFactory(model, new AxialCurvesFactory())
  );

  it('buildRenderableLayer should return expected value', () => {
    const constLines = {
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
    factory = newFactory(constLines);
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(constLines.code);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  });

});
