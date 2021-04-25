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
    layersManager.showLayer(constellations);
    return layer;
  };

  describe('showBoundaries should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');

      manager.showBoundaries(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(0);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'showBoundaries');

      manager.showBoundaries(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showBoundaries).toHaveBeenCalledTimes(1);
      expect(layer.showBoundaries).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'showBoundaries');

      manager.showBoundaries(false);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showBoundaries).toHaveBeenCalledTimes(1);
      expect(layer.showBoundaries).toHaveBeenCalledWith(false);
    });

  });

  describe('showLines should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');

      manager.showLines(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(0);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'showLines');

      manager.showLines(true);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showLines).toHaveBeenCalledTimes(1);
      expect(layer.showLines).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layersManager, 'hideLayer');
      spyOn(layersManager, 'showLayer');
      spyOn(layer, 'showLines');

      manager.showLines(false);
      expect(layersManager.showLayer).toHaveBeenCalledTimes(1);
      expect(layersManager.hideLayer).toHaveBeenCalledTimes(1);
      expect(layer.showLines).toHaveBeenCalledTimes(1);
      expect(layer.showLines).toHaveBeenCalledWith(false);
    });

  });

});
