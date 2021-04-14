import { TestBed } from '@angular/core/testing';
import { SelectorMessierNamesComponent } from 'src/app/modules/layer-messier/components/selector-messier-names/selector-messier-names.component';
import { LayerMessierModule } from 'src/app/modules/layer-messier/layer-messier.module';
import { MessierProvidersService } from 'src/app/modules/layer-messier/services/messier-providers.service';
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
    const layersService = TestBed.inject(LayerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    layersService.rootLayer = mockedLayers;
    const messierLayer = mockedLayers.subLayers[3];
    const provider = TestBed.inject(MessierProvidersService);
    layersService.registerLayer(provider.getRenderableLayer(messierLayer));
    component = TestBed.createComponent(SelectorMessierNamesComponent).componentInstance;
    component.layer = messierLayer;
  });

  describe('namesShown should', () => {

    it('return true by default', () => {
      expect(component.namesShown).toBeTrue();
    });

    it('trigger the showing of the names', () => {
      spyOn(textsVisibilityManager, 'hideTexts');
      spyOn(textsVisibilityManager, 'showTexts');

      component.namesShown = true;
      expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(0);
      expect(textsVisibilityManager.showTexts).toHaveBeenCalledTimes(1);
    });

    it('trigger the hiding of the names', () => {
      spyOn(textsVisibilityManager, 'hideTexts');
      spyOn(textsVisibilityManager, 'showTexts');

      component.namesShown = false;
      expect(textsVisibilityManager.hideTexts).toHaveBeenCalledTimes(1);
      expect(textsVisibilityManager.showTexts).toHaveBeenCalledTimes(0);
    });

  });

});
