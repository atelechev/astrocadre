import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';

const code = 'test';
const label = 'Test';
const description = 'description';

class TestLayer extends RenderableLayer {

  constructor() {
    super(code, [], label, description);
  }

  public applyTheme(): void {
    // nothing
  }

}

const theme: Theme = {
  code: 'test-theme',
  label: 'Test theme',
  background: {
    color: 'white'
  },
  layers: [{
    code: 'test',
    visibleOnLoad: true
  }]
};

describe('RenderableLayer', () => {

  let renderable: RenderableLayer;

  beforeEach(() => {
    renderable = new TestLayer();
  });

  it('code should return expected value', () => {
    expect(renderable.code).toEqual(code);
  });

  it('label should return expected value', () => {
    expect(renderable.label).toEqual(label);
  });

  it('description should return expected value', () => {
    expect(renderable.description).toEqual(description);
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
        const emptyTheme: Theme = {
          code: 'empty',
          label: 'Empty',
          background: {
            color: 'black'
          },
          layers: []
        };
        expect(renderable.extractStyle(emptyTheme)).toBeUndefined();
      });

    });

    it('expected style for a matched layer', () => {
      const style = renderable.extractStyle(theme);
      expect(style).toBeDefined();
      expect(style.code).toEqual(renderable.code);
    });

  });

});
