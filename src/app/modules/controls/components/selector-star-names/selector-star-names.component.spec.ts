import { LayerService } from '#core/services/layer.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { SelectorStarNamesComponent } from '#controls/components/selector-star-names/selector-star-names.component';
import { NameSelectionType } from '#controls/models/name-selection-type';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { LayersVisibilityManagerService } from '#core/services/layers-visibility-manager.service';
import { StarsVisibilityManagerService } from '#core/services/stars-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/texts-visibility-manager.service';


describe('SelectorStarNamesComponent', () => {

  let ctx: TestContext;
  let layersService: LayerService;
  let visibilityManager: LayersVisibilityManagerService;
  let textsVisibilityManager: TextsVisibilityManagerService;
  let starsVisibilityManager: StarsVisibilityManagerService;
  let component: SelectorStarNamesComponent;

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorStarNamesComponent)
      .configure();
    layersService = ctx.layerService;
    visibilityManager = ctx.getService(LayersVisibilityManagerService);
    starsVisibilityManager = ctx.getService(StarsVisibilityManagerService);
    textsVisibilityManager = ctx.getService(TextsVisibilityManagerService);
    layersService.rootLayer = mockedLayers;
    const starsLayer = mockedLayers.subLayers[1];
    layersService.registerLayer(starsLayer);
    layersService.registerLayer(starsLayer.subLayers[0]);
    component = ctx.getComponent(SelectorStarNamesComponent);
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
