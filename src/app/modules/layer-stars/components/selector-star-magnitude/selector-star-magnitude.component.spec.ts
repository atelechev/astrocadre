import { TestBed } from '@angular/core/testing';
import { SelectorStarMagnitudeComponent } from '#layer-stars/components/selector-star-magnitude/selector-star-magnitude.component';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { Layer } from '#core/models/layers/layer';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';


describe('SelectorStarMagnitudeComponent', () => {

  let starsVisibilityManager: StarsVisibilityManagerService;
  let component: SelectorStarMagnitudeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    const provider = TestBed.inject(StarsProvidersService);
    const layerService = TestBed.inject(LayerService);
    const starsLayer = mockedLayers.subLayers[1];
    layerService.registerLayer(provider.getRenderableLayer(starsLayer));
    starsLayer.subLayers.forEach(
      (subModel: Layer) => {
        const subLayer = provider.getRenderableLayer(subModel);
        layerService.registerLayer(subLayer);
      }
    );
    starsVisibilityManager = TestBed.inject(StarsVisibilityManagerService);
    component = TestBed.createComponent(SelectorStarMagnitudeComponent).componentInstance;
  });

  describe('shownMagnitudeDownTo', () => {

    it('get should return expected value by default', () => {
      expect(component.shownMagnitudeDownTo).toEqual(6);
    });

    describe('set', () => {

      describe('should have no effect', () => {

        it('if the arg is falsy', () => {
          spyOn(starsVisibilityManager, 'showStarLayersDownToMagnitude');
          component.shownMagnitudeDownTo = undefined;
          expect(component.shownMagnitudeDownTo).toEqual(6);
          expect(starsVisibilityManager.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(0);
        });

        it('if the arg is the same as the current value', () => {
          spyOn(starsVisibilityManager, 'showStarLayersDownToMagnitude');
          component.shownMagnitudeDownTo = 6;
          expect(starsVisibilityManager.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(0);
        });

      });

      it('should trigger the showing of star layers by magnitude', () => {
        spyOn(starsVisibilityManager, 'showStarLayersDownToMagnitude');
        component.shownMagnitudeDownTo = 3;
        expect(starsVisibilityManager.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(1);
      });

    });

  });

});
