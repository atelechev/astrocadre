import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { TestContext } from '#core/test-utils/test-context.spec';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';

describe('SelectorLayerComponent', () => {

  let ctx: TestContext;
  let visibilityManager: LayersVisibilityManagerService;
  let component: SelectorLayerComponent;
  const modelStars = mockedLayers.subLayers[1];
  const modelStars3 = modelStars.subLayers[2];

  beforeEach(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(SelectorLayerComponent)
      .configure();
    visibilityManager = ctx.getService(LayersVisibilityManagerService);
    ctx.layerService.registerLayer(modelStars3);
    component = ctx.getComponent(SelectorLayerComponent);
    component.layer = modelStars3;
  });

  describe('isShown should return', () => {


    describe('get should return', () => {

      it('true if the layer is shown', () => {
        visibilityManager.showLayer(modelStars3.code);
        expect(component.isShown).toBeTrue();
      });

      it('false if the layer is not shown', () => {
        visibilityManager.hideLayer(modelStars3.code);
        expect(component.isShown).toBeFalse();
      });

    });

    describe('set should', () => {

      it('show the layer if arg is true', () => {
        visibilityManager.hideLayer(modelStars3.code);
        expect(visibilityManager.isShown(modelStars3.code)).toBeFalse();
        component.isShown = true;
        expect(visibilityManager.isShown(modelStars3.code)).toBeTrue();
      });

      it('hide the layer if arg is false', () => {
        visibilityManager.showLayer(modelStars3.code);
        expect(visibilityManager.isShown(modelStars3.code)).toBeTrue();
        component.isShown = false;
        expect(visibilityManager.isShown(modelStars3.code)).toBeFalse();
      });

    });

    describe('subLayers should return', () => {

      it('expected array for a layer with sub-layers', () => {
        component.layer = modelStars;
        expect(component.subLayers.length).toEqual(3);
      });

      it('an empty array if the layer does not have sub-layers', () => {
        const modelNoSubLayers = {
          code: 'sky-grid',
          label: 'Coordinates grid',
          loadFromUrl: false,
          objects: undefined
        };
        component.layer = modelNoSubLayers;
        expect(component.subLayers).toEqual([]);
      });

    });

    describe('isStarsLayer should return', () => {

      it('true for the stars layer', () => {
        component.layer = modelStars;
        expect(component.isStarsLayer).toBeTrue();
      });

      it('false for any other layer', () => {
        component.layer = modelStars3;
        expect(component.isStarsLayer).toBeFalse();
      });

    });

  });

});
