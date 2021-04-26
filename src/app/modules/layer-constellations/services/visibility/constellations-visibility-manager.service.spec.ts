import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { Constellations } from '#layer-constellations/models/constellations';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';

describe('ConstellationsVisibilityManagerService', () => {

  const constellations = Constellations.CODE;
  const model: Layer = {
    code: constellations,
    label: 'Constellations',
    loadFromUrl: true,
    objects: [{
      boundaries: [[177.5, -24.5, 162.5, -24.5]],
      lines: [[72.46, 6.95, 72.65, 8.9]],
      names: [
        {
          type: 'constellation',
          code: 'AND',
          ra: 8.532,
          dec: 38.906,
          names: ['Andromeda']
        }
      ]
    }]
  };
  let manager: ConstellationsVisibilityManagerService;
  let layersManager: LayersVisibilityManagerService;
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerConstellationsModule],
      providers: [
        LayerService,
        LayersVisibilityManagerService,
        ConstellationsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(ConstellationsVisibilityManagerService);
    layersManager = TestBed.inject(LayersVisibilityManagerService);
  });

  const loadConstellationsLayer = (): Constellations => {
    const provider = TestBed.inject(ConstellationsProvidersService);
    const layer = provider.getRenderableLayer(model);
    layerService.registerLayer(layer);
    layersManager.setVisible(constellations, true);
    return layer;
  };

  describe('setBoundariesVisible should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layersManager, 'setVisible');

      manager.setBoundariesVisible(true);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'setVisible');
      spyOn(layer, 'setBoundariesVisible');

      manager.setBoundariesVisible(true);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setBoundariesVisible).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'setVisible');
      spyOn(layer, 'setBoundariesVisible');

      manager.setBoundariesVisible(false);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setBoundariesVisible).toHaveBeenCalledWith(false);
    });

  });

  describe('setLinesVisible should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layersManager, 'setVisible');

      manager.setLinesVisible(true);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'setVisible');
      spyOn(layer, 'setLinesVisible');

      manager.setLinesVisible(true);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setLinesVisible).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'setVisible');
      spyOn(layer, 'setLinesVisible');

      manager.setLinesVisible(false);
      expect(layersManager.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setLinesVisible).toHaveBeenCalledWith(false);
    });

  });

});
