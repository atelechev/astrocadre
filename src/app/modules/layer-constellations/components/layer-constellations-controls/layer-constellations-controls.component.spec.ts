import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerConstellationsControlsComponent } from '#layer-constellations/components/layer-constellations-controls/layer-constellations-controls.component';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { LayerService } from '#core/services/layer.service';
import { ConstellationsProvidersService } from '#layer-constellations/services/constellations-providers.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { ConstellationsVisibilityManagerService } from '#layer-constellations/services/visibility/constellations-visibility-manager.service';
import { Layer } from '#core/models/layers/layer';


describe('LayerConstellationsControlsComponent', () => {

  const layer: Layer = {
    code: 'constellations',
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
    TestBed.inject(LayerService).registerLayer(renderable);
    TestBed.inject(LayersVisibilityManagerService).showLayer(layer.code);
    component = TestBed.createComponent(LayerConstellationsControlsComponent).componentInstance;
    component.layer = renderable;
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

  describe('boundariesShown should', () => {

    it('return true by default', () => {
      expect(component.boundariesShown).toBeTrue();
    });

    it('trigger the showing of the boundaries', () => {
      spyOn(visibilityManager, 'showBoundaries');

      component.boundariesShown = true;
      expect(visibilityManager.showBoundaries).toHaveBeenCalledTimes(1);
      expect(visibilityManager.showBoundaries).toHaveBeenCalledWith(true);
    });

    it('trigger the hiding of the boundaries', () => {
      spyOn(visibilityManager, 'showBoundaries');

      component.boundariesShown = false;
      expect(visibilityManager.showBoundaries).toHaveBeenCalledTimes(1);
      expect(visibilityManager.showBoundaries).toHaveBeenCalledWith(false);
    });

  });

  describe('linesShown should', () => {

    it('return true by default', () => {
      expect(component.linesShown).toBeTrue();
    });

    it('trigger the showing of the lines', () => {
      spyOn(visibilityManager, 'showLines');

      component.linesShown = true;
      expect(visibilityManager.showLines).toHaveBeenCalledTimes(1);
      expect(visibilityManager.showLines).toHaveBeenCalledWith(true);
    });

    it('trigger the hiding of the lines', () => {
      spyOn(visibilityManager, 'showLines');

      component.linesShown = false;
      expect(visibilityManager.showLines).toHaveBeenCalledTimes(1);
      expect(visibilityManager.showLines).toHaveBeenCalledWith(false);
    });

  });

});
