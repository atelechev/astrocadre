import { Layer } from '#core/models/layer';
import { TestContext } from '#core/test-utils/test-context.spec';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('LayersComponent', () => {

  let ctx: TestContext;
  let component: LayersComponent;

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(LayersComponent)
      .configure();
    ctx.layerService.rootLayer = mockedLayers;
    component = ctx.getComponent(LayersComponent);
  });

  it('layers should return expected value', () => {
    const layers = component.layers;
    expect(layers).toBeDefined();

    const expected = ['sky-grid', 'stars', 'constellations'];
    expect(layers.length).toEqual(expected.length);

    const codes = layers.map((layer: Layer) => layer.code);
    expect(codes).toEqual(expected);
  });

});
