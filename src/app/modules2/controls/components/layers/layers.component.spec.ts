import { fakeAsync } from '@angular/core/testing';
import { LayersComponent } from 'src/app/modules2/controls/components/layers/layers.component';
import { Layer } from 'src/app/modules2/core/models/layer';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';


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
