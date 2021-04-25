import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';
import { PathsVisibilityManagerService } from '#layer-solar-system/services/visibility/paths-visibility-manager.service';


describe('PathsVisibilityManagerService', () => {

  const solarSystem = SolarSystem.CODE;
  let manager: PathsVisibilityManagerService;
  let layersManager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule],
      providers: [
        LayerService,
        LayersVisibilityManagerService,
        PathsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(PathsVisibilityManagerService);
    layersManager = TestBed.inject(LayersVisibilityManagerService);
  });

  const loadSolarSystemLayer = (): SolarSystem => {
    const model = mockedLayers.subLayers[4];
    const provider = TestBed.inject(SolarSystemProvidersService);
    const layer = provider.getRenderableLayer(model);
    layerService.registerLayer(layer);
    layersManager.showLayer(solarSystem);
    return layer;
  };

  describe('showPaths should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');

      manager.showPaths(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(0);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the solar system layer and trajectories', () => {
      const layer = loadSolarSystemLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'hideTrajectories');
      spyOn(layer, 'showTrajectories');

      manager.showPaths(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showTrajectories).toHaveBeenCalledTimes(1);
      expect(layer.hideTrajectories).toHaveBeenCalledTimes(0);
    });

    it('if the arg is false, trigger the hiding of the solar system layer and trajectories', () => {
      const layer = loadSolarSystemLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'hideTrajectories');
      spyOn(layer, 'showTrajectories');

      manager.showPaths(false);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showTrajectories).toHaveBeenCalledTimes(0);
      expect(layer.hideTrajectories).toHaveBeenCalledTimes(1);
    });

  });

});
