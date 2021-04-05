import { LayerFactory } from '#core/models/layers/factories/layer-factory';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { StarsLayerFactory } from '#core/models/layers/factories/stars-layer-factory';
import { Stars } from '#core/models/layers/stars';

describe('StarsLayerFactory', () => {

  const model = {
    code: 'stars-mag2.0',
    label: 'Magnitude < 2.0',
    loadFromUrl: false,
    objects: [
      [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
    ]
  };
  let factory: LayerFactory;

  beforeEach(() => {
    factory = new StarsLayerFactory(model, new PointsFactory());
  });

  it('STARS_LAYER_CODE_PREFIX should have expected value', () => {
    expect(StarsLayerFactory.STARS_LAYER_CODE_PREFIX).toEqual('stars-mag');
  });

  it('buildRenderableLayer should return expected value', () => {
    const layer = factory.buildRenderableLayer() as Stars;
    expect(layer).toBeDefined();
    expect(layer.code).toEqual(model.code);
    expect(layer.magnitudeClass).toEqual(2);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  });

});
