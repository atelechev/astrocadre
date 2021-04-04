import { Layer } from '#core/models/layers/layer';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { StarsLayerFactory } from '#core/models/layers/factories/stars-layer-factory';
import { TestContext } from '#core/test-utils/test-context.spec';

describe('StarsLayerFactory', () => {

  let ctx: TestContext;
  let factory: StarsLayerFactory;

  beforeEach(() => {
    ctx = new TestContext().configure();
  });

  const newFactory = (model: Layer): StarsLayerFactory => (
    new StarsLayerFactory(model, new PointsFactory())
  );

  it('STARS_LAYER_CODE_PREFIX should have expected value', () => {
    expect(StarsLayerFactory.STARS_LAYER_CODE_PREFIX).toEqual('stars-mag');
  });

  it('buildRenderableLayer should return expected value', () => {
    const starsMag2 = {
      code: 'stars-mag2.0',
      label: 'Magnitude < 2.0',
      loadFromUrl: false,
      objects: [
        [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
      ]
    };
    factory = newFactory(starsMag2);
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(starsMag2.code);
    expect(layer.magnitudeClass).toEqual(2);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  });

});
