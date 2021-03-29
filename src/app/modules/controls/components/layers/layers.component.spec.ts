import { fakeAsync } from '@angular/core/testing';
import { Layer } from '#core/models/layer';
import { TestContext } from '#core/test-utils/test-context.spec';
import { LayersComponent } from '#controls/components/layers/layers.component';


describe('LayersComponent', () => {

  let ctx: TestContext;
  let component: LayersComponent;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(LayersComponent)
      .configure();
    component = ctx.getComponent(LayersComponent);
  }));

  it('layers should return expected value', fakeAsync(() => {
    const layers = component.layers;
    expect(layers).toBeDefined();

    const expected = ['sky-grid', 'stars', 'constellations'];
    expect(layers.length).toEqual(expected.length);

    const codes = layers.map((layer: Layer) => layer.code);
    expect(codes).toEqual(expected);
  }));

});
