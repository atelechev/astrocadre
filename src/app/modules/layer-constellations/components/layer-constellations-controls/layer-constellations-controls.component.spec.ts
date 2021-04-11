import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerService } from '#core/services/layer.service';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { Layer } from '#core/models/layers/layer';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';


describe('LayerConstellationsControlsComponent', () => {

  const constellationsRoot = mockedLayers.subLayers[2];
  let component: LayerConstellationsControlsComponent;
  let visibilityManager: LayersVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerConstellationsModule
      ]
    });
    visibilityManager = TestBed.inject(LayersVisibilityManagerService);
    const layersService = TestBed.inject(LayerService);
    const provider = TestBed.inject(ConstellationsProvidersService);
    layersService.registerLayer(provider.getRenderableLayer(constellationsRoot));
    constellationsRoot.subLayers.forEach(
      (subLayer: Layer) => layersService.registerLayer(provider.getRenderableLayer(subLayer))
    );
    visibilityManager.showLayer(constellationsRoot.code);
    component = TestBed.createComponent(LayerConstellationsControlsComponent).componentInstance;
  });

  describe('options should return', () => {

    it('an empty array if layer is not defined', () => {
      component.layer = undefined;
      expect(component.options).toEqual([]);
    });

    it('the expected value if layer is defined', () => {
      component.layer = constellationsRoot;

      const expectedOptions = [
        { label: 'Boundaries', value: 0 },
        { label: 'Lines', value: 1 },
        { label: 'Names', value: 2 }
      ];
      expect(component.options).toEqual(expectedOptions);
    });

  });

  describe('choices', () => {

    describe('get should return', () => {

      it('an empty array if layer is not defined', () => {
        component.layer = undefined;
        expect(component.choices).toEqual([]);
      });

      it('the expected value if layer is defined', () => {
        component.layer = constellationsRoot;
        const expectedChoices = [0, 1, 2];
        expect(component.choices).toEqual(expectedChoices);
      });

    });

    it('set should show and hide the expected layers', () => {
      component.layer = constellationsRoot;

      constellationsRoot.subLayers.forEach(
        (subLayer: Layer) => expect(visibilityManager.isShown(subLayer.code)).toBeTrue()
      );

      component.choices = [0];
      expect(visibilityManager.isShown(constellationsRoot.subLayers[0].code)).toBeTrue();
      expect(visibilityManager.isShown(constellationsRoot.subLayers[1].code)).toBeFalse();
      expect(visibilityManager.isShown(constellationsRoot.subLayers[2].code)).toBeFalse();
    });

  });

});
