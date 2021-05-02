import { TestBed } from '@angular/core/testing';
import { SelectorStarMagnitudeComponent } from '#layer-stars/components/selector-star-magnitude/selector-star-magnitude.component';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';


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

    let counter = 0;
    const registerLayer = (code: string): void => {
      provider.getRenderableLayer(code)
        .then(
          (layer: RenderableLayer) => {
            layerService.registerLayer(layer, counter++);
            layer.subLayers.forEach(
              (subLayer: string) => registerLayer(subLayer)
            );
          });
    };
    registerLayer('stars');

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
