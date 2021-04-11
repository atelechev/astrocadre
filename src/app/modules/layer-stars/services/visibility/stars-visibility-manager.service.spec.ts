import { TestBed } from '@angular/core/testing';
import { Stars } from '#layer-stars/models/stars';
import { LayerService } from '#core/services/layer.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { getSubRenderables } from '#core/test-utils/utils.spec';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { Layer } from '#core/models/layers/layer';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';


describe('StarsVisibilityManagerService', () => {

  const stars = 'stars';
  const starsMag2 = 'stars-mag2.0';
  let manager: StarsVisibilityManagerService;
  let layersManager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerStarsModule],
      providers: [
        LayerService,
        LayersVisibilityManagerService,
        SearchService,
        StarsVisibilityManagerService,
        TextsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(StarsVisibilityManagerService);
    layersManager = TestBed.inject(LayersVisibilityManagerService);
  });

  const loadStarsLayers = (): void => {
    const starsModel = mockedLayers.subLayers[1];
    const provider = TestBed.inject(StarsProvidersService);
    [
      starsModel,
      starsModel.subLayers[0],
      starsModel.subLayers[1],
      starsModel.subLayers[2]
    ].forEach(
      (model: Layer) => {
        const layer = provider.getRenderableLayer(model);
        layerService.registerLayer(layer);
      });
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
      assertLayersShown([stars, starsMag2, 'stars-mag2.5', 'stars-mag3.0']);
    };

    it('hide all the star layers of magnitude greater than the argument', () => {
      loadStarsLayers();

      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(2);
      assertLayersShown([stars, starsMag2]);
      assertLayersHidden(['stars-mag2.5', 'stars-mag3.0']);
    });

    it('have no effect if the arg is falsy', () => {
      loadStarsLayers();

      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(undefined);
      assertAllLayersShown();
    });

  });

  describe('showStarsProperNames should', () => {

    it('show the proper names if useProper is true', () => {
      loadStarsLayers();

      manager.showStarsProperNames(true);
      const layer = layerService.getRenderableLayer(stars) as Stars;
      expect(layer.properNamesShown).toBeTrue();
      getSubRenderables(stars, layerService)
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
      getSubRenderables(stars, layerService)
        .forEach(
          (subLayer: Stars) =>
            expect(subLayer.properNamesShown).toBeFalse()
        );
    });

  });

});
