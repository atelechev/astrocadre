import { TestBed } from '@angular/core/testing';
import { LineSegments } from 'three';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { Constellations } from '#layer-constellations/models/constellations';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';

describe('ConstellationsVisibilityManagerService', () => {

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
    const layer = new Constellations(
      new LineSegments(),
      new LineSegments(),
      [],
      []
    );
    layerService.registerLayer(layer, 1);
    layerService.setVisible(layer.code, true);
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
