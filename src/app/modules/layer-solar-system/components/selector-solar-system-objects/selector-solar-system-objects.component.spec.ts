import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { SelectorSolarSystemObjectsComponent } from '#layer-solar-system/components/selector-solar-system-objects/selector-solar-system-objects.component';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';
import { SolarSystem } from '#layer-solar-system/model/solar-system';


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
    const layerService = TestBed.inject(LayerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    pathsVisibilityManager = TestBed.inject(PathsVisibilityManagerService);
    const layer = new SolarSystem();
    layerService.registerLayer(layer, 1);
    component = TestBed.createComponent(SelectorSolarSystemObjectsComponent).componentInstance;
    component.layer = layer;
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

  describe('pathsShown should', () => {

    it('return true by default', () => {
      expect(component.pathsShown).toBeTrue();
    });

    it('trigger the showing of the paths', () => {
      spyOn(pathsVisibilityManager, 'setPathsVisible');

      component.pathsShown = true;
      expect(pathsVisibilityManager.setPathsVisible).toHaveBeenCalledTimes(1);
      expect(pathsVisibilityManager.setPathsVisible).toHaveBeenCalledWith(true);
    });


    it('trigger the hiding of the paths', () => {
      spyOn(pathsVisibilityManager, 'setPathsVisible');

      component.pathsShown = false;
      expect(pathsVisibilityManager.setPathsVisible).toHaveBeenCalledTimes(1);
      expect(pathsVisibilityManager.setPathsVisible).toHaveBeenCalledWith(false);
    });

  });

});
