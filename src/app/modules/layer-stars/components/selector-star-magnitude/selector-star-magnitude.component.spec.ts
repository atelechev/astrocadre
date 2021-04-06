import { TestBed } from '@angular/core/testing';
import { SelectorStarMagnitudeComponent } from '#layer-stars/components/selector-star-magnitude/selector-star-magnitude.component';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#layer-stars/services/stars-visibility-manager.service';
import { registerMockStarsLayers } from '#core/test-utils/utils.spec';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';


describe('SelectorStarMagnitudeComponent', () => {

  let starsVisibilityManager: StarsVisibilityManagerService;
  let visibilityManager: LayersVisibilityManagerService;
  let component: SelectorStarMagnitudeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerStarsModule
      ]
    });
    registerMockStarsLayers(TestBed.inject(LayerService));
    starsVisibilityManager = TestBed.inject(StarsVisibilityManagerService);
    visibilityManager = TestBed.inject(LayersVisibilityManagerService);
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
