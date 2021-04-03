import { fakeAsync } from '@angular/core/testing';
import { Layer } from '#core/models/layer';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { ConstellationBoundariesLayerFactory } from '#core/models/layers/factories/constellation-boundaries-layer-factory';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('ConstellationBoundariesLayerFactory', () => {

  let ctx: TestContext;
  let factory: ConstellationBoundariesLayerFactory;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext().configure();
  }));

  const newFactory = (model: Layer): ConstellationBoundariesLayerFactory => (
    new ConstellationBoundariesLayerFactory(model, new AxialCurvesFactory())
  );

  it('buildRenderableLayer should return expected value', fakeAsync(() => {
    const constBoundaries = {
      code: 'constellation-boundaries',
      label: 'Boundaries',
      loadFromUrl: false,
      objects: [
        [177.5, -24.5, 162.5, -24.5],
        [170.0, 73.5, 170.0, 66.5],
        [165.0, 25.5, 161.25, 25.5]
      ]
    };
    factory = newFactory(constBoundaries);
    const layer = factory.buildRenderableLayer();
    expect(layer).toBeDefined();
    expect(layer.model).toEqual(constBoundaries);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(0);
    expect(layer.searchables.length).toEqual(0);
  }));

});
