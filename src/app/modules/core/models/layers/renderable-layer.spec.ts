import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';


class TestRenderableLayer extends RenderableLayer {

  constructor(model: Layer) {
    super(model);
  }

  public applyTheme(): void {
    // nothing
  }

}

describe('RenderableLayer', () => {

  let renderable: RenderableLayer;
  const layer: Layer = {
    code: 'tested-layer',
    label: 'Tested',
    loadFromUrl: false,
    description: 'test',
    objects: []
  };

  beforeEach(() => {
    renderable = new TestRenderableLayer(layer);
  });

  it('code should return expected value', () => {
    expect(renderable.code).toEqual(layer.code);
  });

  it('label should return expected value', () => {
    expect(renderable.label).toEqual(layer.label);
  });

  it('loadFromUrl should return expected value', () => {
    expect(renderable.loadFromUrl).toEqual(layer.loadFromUrl);
  });

  it('description should return expected value', () => {
    expect(renderable.description).toEqual(layer.description);
  });

  it('subLayers should return an empty array', () => {
    expect(renderable.subLayers).toEqual([]);
  });

  it('objects should return an empty array', () => {
    expect(renderable.objects).toEqual([]);
  });

  it('texts should return an empty array', () => {
    expect(renderable.texts).toEqual([]);
  });

  it('searchables should return an empty array', () => {
    expect(renderable.searchables).toEqual([]);
  });

  describe('extractStyle should return', () => {

    describe('undefined', () => {

      it('if the arg is falsy', () => {
        expect(renderable.extractStyle(undefined)).toBeUndefined();
      });

      it('if the layer was not found', () => {
        const theme: Theme = {
          code: 'empty',
          label: 'Empty',
          background: {
            color: 'black'
          },
          layers: []
        };
        expect(renderable.extractStyle(theme)).toBeUndefined();
      });

    });

    describe('expected style', () => {

      const assertStyleExpected = (model: Layer, expectedCode: string): void => {
        renderable = new TestRenderableLayer(model);
        const style = renderable.extractStyle(mockedTheme);
        expect(style).toBeDefined();
        expect(style.code).toEqual(expectedCode);
      };

      it('for a layer other than stars', () => {
        const model: Layer = {
          code: 'sky-grid',
          label: 'Sky grid',
          loadFromUrl: false,
          objects: []
        };
        assertStyleExpected(model, model.code);
      });

      it('for the stars layer', () => {
        const model: Layer = {
          code: 'stars',
          label: 'Stars',
          loadFromUrl: false,
          objects: []
        };
        assertStyleExpected(model, model.code);
      });

      it('for a sub-layer of the stars layer', () => {
        const model: Layer = {
          code: 'stars-mag2.0',
          label: 'Stars mag 2.0',
          loadFromUrl: false,
          objects: []
        };
        assertStyleExpected(model, 'stars');
      });

    });

  });

});
