import { LayerService } from '#core/services/layer.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { SelectorStarNamesComponent } from '#controls/components/selector-star-names/selector-star-names.component';
import { NameSelectionType } from '#controls/models/name-selection-type';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('SelectorStarNamesComponent', () => {

  let ctx: TestContext;
  let layersService: LayerService;
  let component: SelectorStarNamesComponent;

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorStarNamesComponent)
      .configure();
    layersService = ctx.layerService;
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
        spyOn(layersService, 'hideTexts');
        component.shownNames = -1;
        expect(component.shownNames).toEqual(1);
        expect(layersService.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should have no effect if the value is greater than the number of possible choices', () => {
        spyOn(layersService, 'hideTexts');
        component.shownNames = 3;
        expect(component.shownNames).toEqual(1);
        expect(layersService.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should have no effect if the choice is the same than before', () => {
        spyOn(layersService, 'hideTexts');
        component.shownNames = 1;
        expect(component.shownNames).toEqual(1);
        expect(layersService.hideTexts).toHaveBeenCalledTimes(0);
      });

      it('should hide the names if the choice is "None"', () => {
        spyOn(layersService, 'hideTexts');
        spyOn(layersService, 'showTexts');
        component.shownNames = 0;
        expect(layersService.hideTexts).toHaveBeenCalledTimes(1);
        expect(layersService.showTexts).toHaveBeenCalledTimes(0);
      });

      it('should trigger the showing of the standard names', () => {
        spyOn(layersService, 'hideTexts');
        spyOn(layersService, 'showStarsProperNames');
        spyOn(layersService, 'showTexts');
        component.shownNames = 2;
        expect(layersService.hideTexts).toHaveBeenCalledTimes(1);
        expect(layersService.showStarsProperNames).toHaveBeenCalledWith(false);
        expect(layersService.showTexts).toHaveBeenCalledTimes(1);
      });

      it('should trigger the showing of the proper names', () => {
        component.shownNames = 2;
        spyOn(layersService, 'hideTexts');
        spyOn(layersService, 'showStarsProperNames');
        spyOn(layersService, 'showTexts');
        component.shownNames = 1;
        expect(layersService.hideTexts).toHaveBeenCalledTimes(1);
        expect(layersService.showStarsProperNames).toHaveBeenCalledWith(true);
        expect(layersService.showTexts).toHaveBeenCalledTimes(1);
      });

    });

  });

  describe('isDisabled should return', () => {

    it('true if the star layer is not shown', () => {
      layersService.hideLayer('stars');
      expect(component.isDisabled).toBeTrue();
    });

    it('false if the star layer is shown', () => {
      layersService.showLayer('stars');
      expect(component.isDisabled).toBeFalse();
    });

  });


});
