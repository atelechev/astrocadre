import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
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
  let layerService: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerConstellationsModule],
      providers: [
        LayerService,
        ConstellationsVisibilityManagerService,
        ThemeService
      ]
    });
    layerService = TestBed.inject(LayerService);
    manager = TestBed.inject(ConstellationsVisibilityManagerService);
  });

  const loadConstellationsLayer = (): Constellations => {
    const provider = TestBed.inject(ConstellationsProvidersService);
    const layer = provider.getRenderableLayer(model);
    layerService.registerLayer(layer);
    layerService.setVisible(constellations, true);
    return layer;
  };

  describe('setBoundariesVisible should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layerService, 'setVisible');

      manager.setBoundariesVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setBoundariesVisible');

      manager.setBoundariesVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setBoundariesVisible).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the boundaries', () => {
      const layer = loadConstellationsLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setBoundariesVisible');

      manager.setBoundariesVisible(false);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setBoundariesVisible).toHaveBeenCalledWith(false);
    });

  });

  describe('setLinesVisible should', () => {

    it('have no effect if the layer does not exist', () => {
      spyOn(layerService, 'setVisible');

      manager.setLinesVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(0);
    });

    it('if the arg is true, trigger the showing of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setLinesVisible');

      manager.setLinesVisible(true);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setLinesVisible).toHaveBeenCalledWith(true);
    });

    it('if the arg is false, trigger the hiding of the lines', () => {
      const layer = loadConstellationsLayer();
      spyOn(layerService, 'setVisible');
      spyOn(layer, 'setLinesVisible');

      manager.setLinesVisible(false);
      expect(layerService.setVisible).toHaveBeenCalledTimes(2);
      expect(layer.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(layer.setLinesVisible).toHaveBeenCalledWith(false);
    });

  });

});
