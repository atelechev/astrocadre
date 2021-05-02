import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';


describe('PathsVisibilityManagerService', () => {

  const solarSystem = SolarSystem.CODE;
  let manager: PathsVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule],
      providers: [
        LayerService,
        PathsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(PathsVisibilityManagerService);
  });

  const loadSolarSystemLayer = (): SolarSystem => {
    const layer = new SolarSystem();
    layerService.registerLayer(layer, 1);
    layerService.setVisible(solarSystem, true);
    return layer;
  };

  describe('showPaths should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layerService, 'setVisible');

      manager.setPathsVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the solar system layer and trajectories', () => {
      const layer = loadSolarSystemLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setTrajectoriesVisible');

      manager.setPathsVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setTrajectoriesVisible).toHaveBeenCalledTimes(1);
    });

    it('if the arg is false, trigger the hiding of the solar system layer and trajectories', () => {
      const layer = loadSolarSystemLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setTrajectoriesVisible');

      manager.setPathsVisible(false);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setTrajectoriesVisible).toHaveBeenCalledTimes(1);
    });

  });

});
