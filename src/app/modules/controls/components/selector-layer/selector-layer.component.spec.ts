import { Injectable, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerService } from '#core/services/layer.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { LayerProvider } from '#core/models/layers/layer-provider';
import { LayerProvidersRegistryService } from '#controls/services/layer-providers-registry.service';


class TestLayer extends RenderableLayer {

  constructor(code: string, subLayers: Array<string> = []) {
    super(code, subLayers, 'Test');
  }

  public applyTheme(): void {
    // nothing
  }

}

const testLayer = new TestLayer('test');

class MockComponent {

}

@Injectable()
class MockProvider implements LayerProvider {

  public get code(): string {
    return 'test';
  }

  public getRenderableLayer(): Promise<RenderableLayer> {
    return Promise.resolve(testLayer);
  }

  public getUiControlsComponentType(): Type<any> {
    return MockComponent;
  }

}

@Injectable()
class MockRegistry {

  public get layerProviders(): Array<LayerProvider> {
    return [];
  }

}

describe('SelectorLayerComponent', () => {

  const code = 'test';
  let layerService: LayerService;
  let component: SelectorLayerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ],
      providers: [
        MockProvider,
        {
          provide: LayerProvidersRegistryService,
          useClass: MockRegistry
        }
      ]
    });
    layerService = TestBed.inject(LayerService);
    layerService.registerLayer(testLayer, 0);
    component = TestBed.createComponent(SelectorLayerComponent).componentInstance;
    component.layer = testLayer;
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
      const subLayers = ['sub1', 'sub2'];
      const layerWithSubs = new TestLayer('withSub0', subLayers);
      const initIndex = 1;
      layerService.registerLayer(layerWithSubs, initIndex);
      subLayers.forEach(
        (subCode: string, i: number) => layerService.registerLayer(new TestLayer(subCode), initIndex + (i + 1))
      );
      component.layer = layerWithSubs;
      expect(component.subLayers.length).toEqual(subLayers.length);
    });

    it('an empty array if the layer does not have sub-layers', () => {
      component.layer = layerService.getRenderableLayer(code);
      expect(component.subLayers).toEqual([]);
    });

  });

  describe('hasCustomUiControls should return', () => {

    it('false if no custom controls are expected for the layer', () => {
      const registry = TestBed.inject(LayerProvidersRegistryService);
      spyOnProperty(registry, 'layerProviders').and.returnValue([]);

      component.layer = testLayer;
      expect(component.hasCustomUiControls).toBeFalse();
    });

    it('true if custom controls are expected for the layer', () => {
      const registry = TestBed.inject(LayerProvidersRegistryService);
      const mockProvider = TestBed.inject(MockProvider);
      spyOnProperty(registry, 'layerProviders').and.returnValue([mockProvider]);

      component.layer = testLayer;
      expect(component.hasCustomUiControls).toBeTrue();
    });

  });

  describe('controlsComponentType should return', () => {

    it('undefined if no custom controls are expected for the layer', () => {
      const registry = TestBed.inject(LayerProvidersRegistryService);
      spyOnProperty(registry, 'layerProviders').and.returnValue([]);

      component.layer = testLayer;
      expect(component.controlsComponentType).toBeUndefined();
    });

    it('defined value if custom controls are expected for the layer', () => {
      const registry = TestBed.inject(LayerProvidersRegistryService);
      const mockProvider = TestBed.inject(MockProvider);
      spyOnProperty(registry, 'layerProviders').and.returnValue([mockProvider]);

      component.layer = testLayer;
      // the exact type is not checked, because it is out of scope of this module
      expect(component.controlsComponentType).toBeDefined();
    });

  });

});
