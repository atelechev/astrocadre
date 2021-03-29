import { fakeAsync } from '@angular/core/testing';
import { Layer } from '#core/models/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#core/models/layers/factories/sky-grid-layer-factory';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('SkyGridLayerFactory', () => {

  let ctx: TestContext;
  let factory: SkyGridLayerFactory;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext().configure();
  }));

  const newFactory = (model: Layer): SkyGridLayerFactory => (
    new SkyGridLayerFactory(model, ctx.materialsService, ctx.eventsService, new AxialCurvesFactory())
  );

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
    const skyGrid = {
      code: 'sky-grid',
      label: 'Coordinates grid',
      loadFromUrl: false,
      objects: []
    };
    factory = newFactory(skyGrid);
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.model).toEqual(skyGrid);
    expect(layer.objects.length).toEqual(4);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  }));

});
