import { Layer } from '#core/models/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Stars } from '#core/models/layers/stars';
import { LayerService } from '#core/services/layer.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('LayerService', () => {

  const stars = 'stars';
  const skyGrid = 'sky-grid';
  let service: LayerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    service = ctx.layerService;
    service.registerLayer(mockedLayers);
  });

  const loadStarsLayers = (): void => {
    const starsLayerModel = mockedLayers.subLayers[1];
    service.registerLayer(starsLayerModel);
    service.registerLayer(starsLayerModel.subLayers[0]);
    service.registerLayer(starsLayerModel.subLayers[1]);
    service.registerLayer(starsLayerModel.subLayers[2]);
  };

  const loadSkyGridLayer = (): void => {
    service.registerLayer(mockedLayers.subLayers[0]);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(service.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(service.isShown(code)).toBeFalse()
    );
  };

  const getSubRenderables = (code: string): Array<RenderableLayer> =>
    service.getRenderableLayer(code)
      .model
      .subLayers
      .map((subLayer: Layer) => service.getRenderableLayer(subLayer.code));

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(service.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        expect(service.isShown('stars-mag12.0')).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', () => {
      loadSkyGridLayer();

      expect(service.isShown(skyGrid)).toBeTrue();
    });

  });

  describe('getRenderableLayer should return', () => {

    describe('undefined', () => {

      it('if the arg is undefined', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the layer was not found', () => {
        expect(service.getRenderableLayer('no-layer')).toBeUndefined();
      });

      it('for the root layer', () => {
        expect(service.getRenderableLayer('root')).toBeUndefined();
      });

    });

    it('expected layer of an inner level', () => {
      loadSkyGridLayer();

      const layer = service.getRenderableLayer(skyGrid);
      expect(layer).toBeDefined();
      expect(layer.model.code).toEqual(skyGrid);
    });

  });

  describe('showLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      service.showLayer(undefined);
      expect(service.isShown(undefined)).toBeFalse();
    });

    it('show the layer and its sub-layers', () => {
      loadStarsLayers();

      service.showLayer(stars);
      assertLayersShown([stars, 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

  describe('hideLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      service.hideLayer(undefined);
      expect(service.isShown(undefined)).toBeFalse();
    });

    it('hide the layer and its sub-layers', () => {
      loadStarsLayers();

      service.hideLayer(stars);
      assertLayersHidden([stars, 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

  describe('showStarLayersDownToMagnitude should', () => {

    const assertAllLayersShown = (): void => {
      assertLayersShown([skyGrid, stars, 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
    };

    it('hide all the star layers of magnitude greater than the argument', () => {
      loadSkyGridLayer();
      loadStarsLayers();

      assertAllLayersShown();
      service.showStarLayersDownToMagnitude(2);
      assertLayersShown([skyGrid, stars, 'stars-mag2.0']);
      assertLayersHidden(['stars-mag2.5', 'stars-mag3.0']);
    });

    it('have no effect if the arg is falsy', () => {
      loadSkyGridLayer();
      loadStarsLayers();

      assertAllLayersShown();
      service.showStarLayersDownToMagnitude(undefined);
      assertAllLayersShown();
    });

  });

  it('showTexts should show the texts of the layer and its sub-layers', () => {
    loadStarsLayers();

    const renderable = service.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    service.showTexts(renderable);
    expect(renderable.areTextsShown).toBeTrue();
    getSubRenderables(stars)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeTrue()
      );
  });

  it('hideTexts should hide the texts of the layer and its sub-layers', () => {
    loadStarsLayers();

    const renderable = service.getRenderableLayer(stars);
    expect(renderable).toBeDefined();
    service.hideTexts(renderable);
    expect(renderable.areTextsShown).toBeFalse();
    getSubRenderables(stars)
      .forEach(
        (subLayer: RenderableLayer) =>
          expect(subLayer.areTextsShown).toBeFalse()
      );
  });

  describe('showStarsProperNames should', () => {

    it('show the proper names if useProper is true', () => {
      loadStarsLayers();

      service.showStarsProperNames(true);
      const layer = service.getRenderableLayer(stars) as Stars;
      expect(layer.properNamesShown).toBeTrue();
      getSubRenderables(stars)
        .forEach(
          (subLayer: Stars) =>
            expect(subLayer.properNamesShown).toBeTrue()
        );
    });

    it('show the standard names if useProper is false', () => {
      loadStarsLayers();

      service.showStarsProperNames(false);
      const layer = service.getRenderableLayer(stars) as Stars;
      expect(layer.properNamesShown).toBeFalse();
      getSubRenderables(stars)
        .forEach(
          (subLayer: Stars) =>
            expect(subLayer.properNamesShown).toBeFalse()
        );
    });

  });

});

