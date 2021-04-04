import { TestContext } from '#core/test-utils/test-context.spec';
import { SelectorStarMagnitudeComponent } from '#controls/components/selector-star-magnitude/selector-star-magnitude.component';
import { LayersVisibilityManagerService } from '#core/services/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#core/services/stars-visibility-manager.service';
import { registerMockStarsLayers } from '#core/test-utils/register-mock-stars-layers.spec';


describe('SelectorStarMagnitudeComponent', () => {

  let ctx: TestContext;
  let starsVisibilityManager: StarsVisibilityManagerService;
  let visibilityManager: LayersVisibilityManagerService;
  let component: SelectorStarMagnitudeComponent;

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorStarMagnitudeComponent)
      .configure();
    registerMockStarsLayers(ctx.layerService);
    starsVisibilityManager = ctx.getService(StarsVisibilityManagerService);
    visibilityManager = ctx.getService(LayersVisibilityManagerService);
    component = ctx.getComponent(SelectorStarMagnitudeComponent);
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

  describe('isDisabled should return', () => {

    it('true if the star layer is not shown', () => {
      visibilityManager.hideLayer('stars');
      expect(component.isDisabled).toBeTrue();
    });

    it('false if the star layer is shown', () => {
      visibilityManager.showLayer('stars');
      expect(component.isDisabled).toBeFalse();
    });

  });

});
