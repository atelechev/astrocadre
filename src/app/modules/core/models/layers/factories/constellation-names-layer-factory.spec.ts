import { fakeAsync } from '@angular/core/testing';
import { Layer } from 'src/app/modules/core/models/layer';
import { ConstellationNamesLayerFactory } from 'src/app/modules/core/models/layers/factories/constellation-names-layer-factory';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';


describe('ConstellationNamesLayerFactory', () => {

  let ctx: TestContext;
  let factory: ConstellationNamesLayerFactory;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext().configure();
  }));

  const newFactory = (model: Layer): ConstellationNamesLayerFactory => (
    new ConstellationNamesLayerFactory(model, ctx.materialsService, ctx.eventsService)
  );

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
    const constNames = {
      code: 'constellation-names',
      label: 'Names',
      loadFromUrl: true,
      objects: [
        { type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda', 'Andromeda'] }
      ]
    };
    factory = newFactory(constNames);
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.model).toEqual(constNames);
    expect(layer.objects.length).toEqual(0);
    expect(layer.texts.length).toEqual(1);
    expect(layer.searchables.length).toEqual(1);
  }));

});
