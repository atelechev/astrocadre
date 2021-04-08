import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { SelectorStarNamesComponent } from '#layer-stars/components/selector-star-names/selector-star-names.component';
import { NameSelectionType } from '#controls/models/name-selection-type';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#layer-stars/services/stars-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';


describe('SelectorStarNamesComponent', () => {

  let visibilityManager: LayersVisibilityManagerService;
  let textsVisibilityManager: TextsVisibilityManagerService;
  let starsVisibilityManager: StarsVisibilityManagerService;
  let component: SelectorStarNamesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerStarsModule
      ]
    });
    const layersService = TestBed.inject(LayerService);
    visibilityManager = TestBed.inject(LayersVisibilityManagerService);
    starsVisibilityManager = TestBed.inject(StarsVisibilityManagerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    layersService.rootLayer = mockedLayers;
    const starsLayer = mockedLayers.subLayers[1];
    const starsMag2Layer = starsLayer.subLayers[0];
    const provider = TestBed.inject(StarsProvidersService);
    layersService.registerLayer(provider.getRenderableLayer(starsLayer));
    layersService.registerLayer(provider.getRenderableLayer(starsMag2Layer));
    component = TestBed.createComponent(SelectorStarNamesComponent).componentInstance;
  });

  it('selectableNames should return expected value', () => {
    const selectables = component.selectableNames;
    expect(selectables).toBeDefined();
    const expectedLabels = ['None', 'Proper', 'Standard'];
    const gotNames = selectables.map((selectable: NameSelectionType) => selectable.label);
    expect(gotNames).toEqual(expectedLabels);
  });

  describe('shownNames', () => {

    it('get should return expected value by default', () => {
      expect(component.shownNames).toEqual(1);
    });

    describe('set', () => {

      it('should have no effect if the value is negative', () => {
        spyOn(textsVisibilityManager, 'hideTexts');
        component.shownNames = -1;
        expect(component.shownNames).toEqual(1);
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should have no effect if the value is greater than the number of possible choices', () => {
        spyOn(textsVisibilityManager, 'hideTexts');
        component.shownNames = 3;
        expect(component.shownNames).toEqual(1);
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should have no effect if the choice is the same than before', () => {
        spyOn(textsVisibilityManager, 'hideTexts');
        component.shownNames = 1;
        expect(component.shownNames).toEqual(1);
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should hide the names if the choice is "None"', () => {
        spyOn(textsVisibilityManager, 'hideTexts');
        spyOn(textsVisibilityManager, 'showTexts');
        component.shownNames = 0;
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(1);
        expect(textsVisibilityManager.showTexts).toHaveBeenCalledTimes(0);
      });

      it('should trigger the showing of the standard names', () => {
        spyOn(textsVisibilityManager, 'hideTexts');
        spyOn(starsVisibilityManager, 'showStarsProperNames');
        spyOn(textsVisibilityManager, 'showTexts');
        component.shownNames = 2;
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(1);
        expect(starsVisibilityManager.showStarsProperNames).toHaveBeenCalledWith(false);
        expect(textsVisibilityManager.showTexts).toHaveBeenCalledTimes(1);
      });

      it('should trigger the showing of the proper names', () => {
        component.shownNames = 2;
        spyOn(textsVisibilityManager, 'hideTexts');
        spyOn(starsVisibilityManager, 'showStarsProperNames');
        spyOn(textsVisibilityManager, 'showTexts');
        component.shownNames = 1;
        expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(1);
        expect(starsVisibilityManager.showStarsProperNames).toHaveBeenCalledWith(true);
        expect(textsVisibilityManager.showTexts).toHaveBeenCalledTimes(1);
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
