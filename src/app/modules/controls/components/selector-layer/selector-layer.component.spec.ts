import { TestBed } from '@angular/core/testing';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';

describe('SelectorLayerComponent', () => {

  let visibilityManager: LayersVisibilityManagerService;
  let component: SelectorLayerComponent;
  const code = 'sky-grid';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    visibilityManager = TestBed.inject(LayersVisibilityManagerService);
    const layer = new MockedGridLayerFactory().buildRenderableLayer();
    TestBed.inject(LayerService).registerLayer(layer);
    component = TestBed.createComponent(SelectorLayerComponent).componentInstance;
    component.layer = layer.model;
  });

  describe('isShown should return', () => {

    describe('get should return', () => {

      it('true if the layer is shown', () => {
        visibilityManager.showLayer(code);
        expect(component.isShown).toBeTrue();
      });

      it('false if the layer is not shown', () => {
        visibilityManager.hideLayer(code);
        expect(component.isShown).toBeFalse();
      });

    });

    describe('set should', () => {

      it('show the layer if arg is true', () => {
        visibilityManager.hideLayer(code);
        expect(visibilityManager.isShown(code)).toBeFalse();
        component.isShown = true;
        expect(visibilityManager.isShown(code)).toBeTrue();
      });

      it('hide the layer if arg is false', () => {
        visibilityManager.showLayer(code);
        expect(visibilityManager.isShown(code)).toBeTrue();
        component.isShown = false;
        expect(visibilityManager.isShown(code)).toBeFalse();
      });

    });

    describe('subLayers should return', () => {

      it('expected array for a layer with sub-layers', () => {
        component.layer = mockedLayers.subLayers[1];
        expect(component.subLayers.length).toEqual(3);
      });

      it('an empty array if the layer does not have sub-layers', () => {
        component.layer = mockedLayers.subLayers[0];
        expect(component.subLayers).toEqual([]);
      });

    });

    describe('isStarsLayer should return', () => {

      it('true for the stars layer', () => {
        component.layer = mockedLayers.subLayers[1];
        expect(component.isStarsLayer).toBeTrue();
      });

      it('false for any other layer', () => {
        component.layer = mockedLayers.subLayers[0];
        expect(component.isStarsLayer).toBeFalse();
      });

    });

  });

});
