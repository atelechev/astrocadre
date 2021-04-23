import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';


describe('SelectorSolarSystemObjectsComponent', () => {

  let textsVisibilityManager: TextsVisibilityManagerService;
  let pathsVisibilityManager: PathsVisibilityManagerService;
  let component: SelectorSolarSystemObjectsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerSolarSystemModule
      ]
    });
    const layersService = TestBed.inject(LayerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    pathsVisibilityManager = TestBed.inject(PathsVisibilityManagerService);
    layersService.rootLayer = mockedLayers;
    const solarSystemLayer = mockedLayers.subLayers[4];
    const provider = TestBed.inject(SolarSystemProvidersService);
    layersService.registerLayer(provider.getRenderableLayer(solarSystemLayer));
    component = TestBed.createComponent(SelectorSolarSystemObjectsComponent).componentInstance;
    component.layer = solarSystemLayer;
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

  describe('pathsShown should', () => {

    it('return true by default', () => {
      expect(component.pathsShown).toBeTrue();
    });

    it('trigger the showing of the paths', () => {
      spyOn(pathsVisibilityManager, 'showPaths');

      component.pathsShown = true;
      expect(pathsVisibilityManager.showPaths).toHaveBeenCalledTimes(1);
      expect(pathsVisibilityManager.showPaths).toHaveBeenCalledWith(true);
    });


    it('trigger the hiding of the paths', () => {
      spyOn(pathsVisibilityManager, 'showPaths');

      component.pathsShown = false;
      expect(pathsVisibilityManager.showPaths).toHaveBeenCalledTimes(1);
      expect(pathsVisibilityManager.showPaths).toHaveBeenCalledWith(false);
    });

  });

});
