import { TestBed } from '@angular/core/testing';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


describe('SelectorMessierNamesComponent', () => {

  let textsVisibilityManager: TextsVisibilityManagerService;
  let component: SelectorMessierNamesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerMessierModule
      ]
    });
    const layerService = TestBed.inject(LayerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    layerService.rootLayer = mockedLayers;
    const messierLayer = mockedLayers.subLayers[3];
    const provider = TestBed.inject(MessierProvidersService);
    layerService.registerLayer(provider.getRenderableLayer(messierLayer));
    component = TestBed.createComponent(SelectorMessierNamesComponent).componentInstance;
    component.layer = messierLayer;
  });

  describe('namesShown should', () => {

    it('return true by default', () => {
      expect(component.namesShown).toBeTrue();
    });

    it('trigger the showing of the names', () => {
      spyOn(textsVisibilityManager, 'setTextsVisible');

      component.namesShown = true;
      expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(1);
    });

    it('trigger the hiding of the names', () => {
      spyOn(textsVisibilityManager, 'setTextsVisible');

      component.namesShown = false;
      expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(1);
    });

  });

});
