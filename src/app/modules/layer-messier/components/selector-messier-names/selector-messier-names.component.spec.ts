import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { CoreModule } from '#core/core.module';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { StaticDataService } from '#core/services/static-data.service';


describe('SelectorMessierNamesComponent', () => {

  const objects = [
    {
      type: 'nebula-supernova',
      code: 'M1',
      ra: 83.63308,
      dec: 22.01450,
      names: ['Crab Nebula'],
      mag: 8.4,
      size: [7.0, 5.0]
    }
  ];

  let textsVisibilityManager: TextsVisibilityManagerService;
  let component: SelectorMessierNamesComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerMessierModule
      ]
    });
    const layerService = TestBed.inject(LayerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);

    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));

    const provider = TestBed.inject(MessierProvidersService);
    component = TestBed.createComponent(SelectorMessierNamesComponent).componentInstance;
    provider.getRenderableLayer().then(
      (layer: RenderableLayer) => {
        layerService.registerLayer(layer, 1);
        component.layer = layer;
      }
    );
    tick();
  }));

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

});
