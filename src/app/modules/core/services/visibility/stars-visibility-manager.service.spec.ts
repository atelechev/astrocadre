import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Stars } from '#core/models/layers/stars';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#core/services/visibility/stars-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { registerMockStarsLayers } from '#core/test-utils/register-mock-stars-layers.spec';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('StarsVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  const skyGrid = 'sky-grid';
  let manager: StarsVisibilityManagerService;
  let layersManager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    layerService = ctx.layerService;
    manager = ctx.getService(StarsVisibilityManagerService);
    layersManager = ctx.getService(LayersVisibilityManagerService);
  });

  const loadSkyGridLayer = (): void => {
    layerService.registerLayer(mockedLayers.subLayers[0]);
    layersManager.showLayer(skyGrid);
  };

  const loadStarsLayers = (): void => {
    registerMockStarsLayers(layerService);
    layersManager.showLayer(stars);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(layersManager.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(layersManager.isShown(code)).toBeFalse()
    );
  };

  describe('showStarLayersDownToMagnitude should', () => {

    const assertAllLayersShown = (): void => {
      assertLayersShown([skyGrid, stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    };

    it('hide all the star layers of magnitude greater than the argument', () => {
      loadSkyGridLayer();
      loadStarsLayers();

      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(2);
      assertLayersShown([skyGrid, stars, starsMag2]);
      assertLayersHidden(['stars-mag2.5', 'stars-mag3.0']);
    });

    it('have no effect if the arg is falsy', () => {
      loadSkyGridLayer();
      loadStarsLayers();

      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(undefined);
      assertAllLayersShown();
    });

  });

  describe('showStarsProperNames should', () => {

    const getSubRenderables = (code: string): Array<RenderableLayer> =>
      layerService.getRenderableLayer(code)
        .subLayers
        .map((subLayer: Layer) => layerService.getRenderableLayer(subLayer.code));

    it('show the proper names if useProper is true', () => {
      loadStarsLayers();

      manager.showStarsProperNames(true);
      const layer = layerService.getRenderableLayer(stars) as Stars;
      expect(layer.properNamesShown).toBeTrue();
      getSubRenderables(stars)
        .forEach(
          (subLayer: Stars) =>
            expect(subLayer.properNamesShown).toBeTrue()
        );
    });

    it('show the standard names if useProper is false', () => {
      loadStarsLayers();

      manager.showStarsProperNames(false);
      const layer = layerService.getRenderableLayer(stars) as Stars;
      expect(layer.properNamesShown).toBeFalse();
      getSubRenderables(stars)
        .forEach(
          (subLayer: Stars) =>
            expect(subLayer.properNamesShown).toBeFalse()
        );
    });

  });

});
