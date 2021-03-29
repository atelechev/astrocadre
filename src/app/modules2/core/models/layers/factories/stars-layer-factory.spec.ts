import { fakeAsync } from '@angular/core/testing';
import { Layer } from 'src/app/modules2/core/models/layer';
import { PointsFactory } from 'src/app/modules2/core/models/layers/factories/points-factory';
import { StarsLayerFactory } from 'src/app/modules2/core/models/layers/factories/stars-layer-factory';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';

describe('StarsLayerFactory', () => {

  let ctx: TestContext;
  let factory: StarsLayerFactory;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext().configure();
  }));

  const newFactory = (model: Layer): StarsLayerFactory => (
    new StarsLayerFactory(model, ctx.materialsService, ctx.eventsService, new PointsFactory())
  );

  it('STARS_LAYER_CODE_PREFIX should have expected value', () => {
    expect(StarsLayerFactory.STARS_LAYER_CODE_PREFIX).toEqual('stars-mag');
  });

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
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
    expect(layer.model).toEqual(starsMag2);
    expect(layer.magnitudeClass).toEqual(2);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  }));

});
