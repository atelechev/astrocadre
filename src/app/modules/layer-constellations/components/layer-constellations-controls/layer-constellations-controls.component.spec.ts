import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerService } from '#core/services/layer.service';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';
import { Layer } from '#core/models/layers/layer';
import { Constellations } from '#layer-constellations/models/constellations';


describe('LayerConstellationsControlsComponent', () => {

  const layer: Layer = {
    code: Constellations.CODE,
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
  let component: LayerConstellationsControlsComponent;
  let textsVisibilityManager: TextsVisibilityManagerService;
  let visibilityManager: ConstellationsVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerConstellationsModule
      ]
    });
    visibilityManager = TestBed.inject(ConstellationsVisibilityManagerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    const renderable = TestBed.inject(ConstellationsProvidersService).getRenderableLayer(layer);
    const layerService = TestBed.inject(LayerService);
    layerService.registerLayer(renderable);
    layerService.setVisible(layer.code, true);
    component = TestBed.createComponent(LayerConstellationsControlsComponent).componentInstance;
    component.layer = renderable;
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

  describe('boundariesShown should', () => {

    it('return true by default', () => {
      expect(component.boundariesShown).toBeTrue();
    });

    it('trigger the showing of the boundaries', () => {
      spyOn(visibilityManager, 'setBoundariesVisible');

      component.boundariesShown = true;
      expect(visibilityManager.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(visibilityManager.setBoundariesVisible).toHaveBeenCalledWith(true);
    });

    it('trigger the hiding of the boundaries', () => {
      spyOn(visibilityManager, 'setBoundariesVisible');

      component.boundariesShown = false;
      expect(visibilityManager.setBoundariesVisible).toHaveBeenCalledTimes(1);
      expect(visibilityManager.setBoundariesVisible).toHaveBeenCalledWith(false);
    });

  });

  describe('linesShown should', () => {

    it('return true by default', () => {
      expect(component.linesShown).toBeTrue();
    });

    it('trigger the showing of the lines', () => {
      spyOn(visibilityManager, 'setLinesVisible');

      component.linesShown = true;
      expect(visibilityManager.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(visibilityManager.setLinesVisible).toHaveBeenCalledWith(true);
    });

    it('trigger the hiding of the lines', () => {
      spyOn(visibilityManager, 'setLinesVisible');

      component.linesShown = false;
      expect(visibilityManager.setLinesVisible).toHaveBeenCalledTimes(1);
      expect(visibilityManager.setLinesVisible).toHaveBeenCalledWith(false);
    });

  });

});
