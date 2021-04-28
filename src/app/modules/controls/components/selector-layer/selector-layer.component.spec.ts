import { TestBed } from '@angular/core/testing';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';

describe('SelectorLayerComponent', () => {

  let layerService: LayerService;
  let component: SelectorLayerComponent;
  const code = SkyGrid.CODE;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerConstellationsModule,
        LayerStarsModule,
        LayerSkyGridModule,
        LayerMessierModule,
        LayerSolarSystemModule
      ],
      providers: [
        AxialCurvesFactoryService,
        MockedGridLayerFactory
      ]
    });
    layerService = TestBed.inject(LayerService);
    const layer = TestBed.inject(MockedGridLayerFactory).buildRenderableLayer();
    layerService.registerLayer(layer);
    component = TestBed.createComponent(SelectorLayerComponent).componentInstance;
    component.layer = layer.model;
  });

  describe('isShown should return', () => {

    describe('get should return', () => {

      it('true if the layer is shown', () => {
        layerService.setVisible(code, true);
        expect(component.isShown).toBeTrue();
      });

      it('false if the layer is not shown', () => {
        layerService.setVisible(code, false);
        expect(component.isShown).toBeFalse();
      });

    });

    describe('set should', () => {

      it('show the layer if arg is true', () => {
        layerService.setVisible(code, false);
        expect(layerService.isShown(code)).toBeFalse();
        component.isShown = true;
        expect(layerService.isShown(code)).toBeTrue();
      });

      it('hide the layer if arg is false', () => {
        layerService.setVisible(code, true);
        expect(layerService.isShown(code)).toBeTrue();
        component.isShown = false;
        expect(layerService.isShown(code)).toBeFalse();
      });

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

  describe('hasCustomUiControls should return', () => {

    it('false if no custom controls are expected for the layer', () => {
      component.layer = mockedLayers.subLayers[0];
      expect(component.hasCustomUiControls).toBeFalse();
    });

    it('true if custom controls are expected for the layer', () => {
      component.layer = mockedLayers.subLayers[1];
      expect(component.hasCustomUiControls).toBeTrue();
    });

  });

  describe('controlsComponentType should return', () => {

    it('undefined if no custom controls are expected for the layer', () => {
      component.layer = mockedLayers.subLayers[0];
      expect(component.controlsComponentType).toBeUndefined();
    });

    it('defined value if custom controls are expected for the layer', () => {
      component.layer = mockedLayers.subLayers[1];
      // the exact type is not checked, because it is out of scope of this module
      expect(component.controlsComponentType).toBeDefined();
    });

  });

});
