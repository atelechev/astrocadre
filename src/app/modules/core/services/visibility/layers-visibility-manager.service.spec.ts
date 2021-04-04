import { skip } from 'rxjs/operators';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { TestContext } from '#core/test-utils/test-context.spec';
import { registerMockStarsLayers } from '#core/test-utils/register-mock-stars-layers.spec';


describe('LayersVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  const skyGrid = 'sky-grid';
  let manager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    layerService = ctx.layerService;
    manager = ctx.getService(LayersVisibilityManagerService);
  });

  const loadSkyGridLayer = (): void => {
    layerService.registerLayer(mockedLayers.subLayers[0]);
  };

  const loadStarsLayers = (): void => {
    registerMockStarsLayers(layerService);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(manager.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(manager.isShown(code)).toBeFalse()
    );
  };

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(manager.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        expect(manager.isShown('stars-mag12.0')).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', () => {
      loadSkyGridLayer();
      manager.showLayer(skyGrid);
      expect(manager.isShown(skyGrid)).toBeTrue();
    });

  });

  describe('layerShown should', () => {

    it('be defined when the service is initialized', () => {
      expect(manager.layerShown).toBeDefined();
    });

    it('propagate an event when a layer is shown', (done: DoneFn) => {
      loadSkyGridLayer();
      manager.layerShown
        .pipe(skip(1))
        .subscribe(
          (layer: RenderableLayer) => {
            expect(layer).toBeDefined();
            expect(layer.code).toEqual(skyGrid);
            done();
          }
        );
      manager.showLayer(skyGrid);
    });

  });

  describe('layerHidden should', () => {

    it('be defined when the service is initialized', () => {
      expect(manager.layerHidden).toBeDefined();
    });

    it('propagate an event when a layer is shown', (done: DoneFn) => {
      loadSkyGridLayer();
      manager.layerHidden
        .pipe(skip(1))
        .subscribe(
          (layer: RenderableLayer) => {
            expect(layer).toBeDefined();
            expect(layer.code).toEqual(skyGrid);
            done();
          }
        );
      manager.hideLayer(skyGrid);
    });

  });

  describe('showLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      manager.showLayer(undefined);
      expect(manager.isShown(undefined)).toBeFalse();
    });

    it('show the layer and its sub-layers', () => {
      loadStarsLayers();

      manager.showLayer(stars);
      assertLayersShown([stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

  describe('hideLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      manager.hideLayer(undefined);
      expect(manager.isShown(undefined)).toBeFalse();
    });

    it('hide the layer and its sub-layers', () => {
      loadStarsLayers();

      manager.hideLayer(stars);
      assertLayersHidden([stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    });

  });

});
