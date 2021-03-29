import { fakeAsync } from '@angular/core/testing';
import { SelectorStarMagnitudeComponent } from 'src/app/modules/controls/components/selector-star-magnitude/selector-star-magnitude.component';
import { LayerService } from 'src/app/modules/core/services/layer.service';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';


describe('SelectorStarMagnitudeComponent', () => {

  let ctx: TestContext;
  let layersService: LayerService;
  let component: SelectorStarMagnitudeComponent;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorStarMagnitudeComponent)
      .configure();
    layersService = ctx.layerService;
    component = ctx.getComponent(SelectorStarMagnitudeComponent);
  }));

  describe('shownMagnitudeDownTo', () => {

    it('get should return expected value by default', () => {
      expect(component.shownMagnitudeDownTo).toEqual(6);
    });

    describe('set', () => {

      describe('should have no effect', () => {

        it('if the arg is falsy', () => {
          spyOn(layersService, 'showStarLayersDownToMagnitude');
          component.shownMagnitudeDownTo = undefined;
          expect(component.shownMagnitudeDownTo).toEqual(6);
          expect(layersService.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(0);
        });

        it('if the arg is the same as the current value', () => {
          spyOn(layersService, 'showStarLayersDownToMagnitude');
          component.shownMagnitudeDownTo = 6;
          expect(layersService.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(0);
        });

      });

      it('should trigger the showing of star layers by magnitude', () => {
        spyOn(layersService, 'showStarLayersDownToMagnitude');
        component.shownMagnitudeDownTo = 3;
        expect(layersService.showStarLayersDownToMagnitude).toHaveBeenCalledTimes(1);
      });

    });

  });

  describe('isDisabled should return', () => {

    it('true if the star layer is not shown', fakeAsync(() => {
      layersService.hideLayer('stars');
      expect(component.isDisabled).toBeTrue();
    }));

    it('false if the star layer is shown', fakeAsync(() => {
      layersService.showLayer('stars');
      expect(component.isDisabled).toBeFalse();
    }));

  });

});
