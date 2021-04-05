import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';


class TestRenderableLayer extends RenderableLayer {

  constructor(model: Layer) {
    super(model);
  }

  public applyTheme(): void {
    // nothing
  }

}

describe('RenderableLayer', () => {

  let layer: RenderableLayer;
  const model: Layer = {
    code: 'tested-layer',
    label: 'Tested',
    loadFromUrl: false,
    description: 'test',
    objects: []
  };

  beforeEach(() => {
    layer = new TestRenderableLayer(model);
  });

  it('code should return expected value', () => {
    expect(layer.code).toEqual(model.code);
  });

  it('label should return expected value', () => {
    expect(layer.label).toEqual(model.label);
  });

  it('loadFromUrl should return expected value', () => {
    expect(layer.loadFromUrl).toEqual(model.loadFromUrl);
  });

  it('description should return expected value', () => {
    expect(layer.description).toEqual(model.description);
  });

  it('subLayers should return an empty array', () => {
    expect(layer.subLayers).toEqual([]);
  });

  it('objects should return an empty array', () => {
    expect(layer.objects).toEqual([]);
  });

  it('texts should return an empty array', () => {
    expect(layer.texts).toEqual([]);
  });

  it('searchables should return an empty array', () => {
    expect(layer.searchables).toEqual([]);
  });

});
