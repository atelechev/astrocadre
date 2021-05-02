import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Stars } from '#layer-stars/models/stars';
import { LayerService } from '#core/services/layer.service';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { StaticDataService } from '#core/services/static-data.service';


describe('StarsVisibilityManagerService', () => {

  const objects = [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ];
  const stars = Stars.CODE;
  const starsMag2 = 'stars-mag2.0';
  const starsMag25 = 'stars-mag2.5';
  const starsMag3 = 'stars-mag3.0';
  const subLayers = [starsMag2, starsMag25, starsMag3];

  let manager: StarsVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerStarsModule],
      providers: [
        LayerService,
        SearchService,
        StarsVisibilityManagerService,
        TextsVisibilityManagerService,
        ThemeService
      ]
    });
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));

    layerService = TestBed.inject(LayerService);
    const provider = TestBed.inject(StarsProvidersService);
    const allLayers = [stars].concat(subLayers).map((code: string) => provider.getRenderableLayer(code));
    Promise.all(allLayers)
      .then(
        (layers: Array<RenderableLayer>) =>
          layers.forEach(
            (layer: RenderableLayer, i: number) => layerService.registerLayer(layer, i)
          )
      ).then(
        (_: any) => layerService.setVisible(stars, true)
      );

    manager = TestBed.inject(StarsVisibilityManagerService);
    tick();
  }));

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(layerService.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(layerService.isShown(code)).toBeFalse()
    );
  };

  describe('showStarLayersDownToMagnitude should', () => {

    const assertAllLayersShown = (): void => {
      assertLayersShown([stars, starsMag2, starsMag25, starsMag3]);
    };

    it('hide all the star layers of magnitude greater than the argument', () => {
      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(2);
      assertLayersShown([stars, starsMag2]);
      assertLayersHidden([starsMag25, starsMag3]);
    });

    it('have no effect if the arg is falsy', () => {
      assertAllLayersShown();
      manager.showStarLayersDownToMagnitude(undefined);
      assertAllLayersShown();
    });

  });

  describe('showStarsProperNames should', () => {

    it('show the proper names if useProper is true', () => {
      manager.showStarsProperNames(true);
      subLayers.forEach(
        (subCode: string) => {
          const subLayer = layerService.getRenderableLayer(subCode) as Stars;
          expect(subLayer.properNamesShown).toBeTrue();
        }
      );
    });

    it('show the standard names if useProper is false', () => {
      manager.showStarsProperNames(false);
      subLayers.forEach(
        (subCode: string) => {
          const subLayer = layerService.getRenderableLayer(subCode) as Stars;
          expect(subLayer.properNamesShown).toBeFalse();
        }
      );
    });

  });

});
