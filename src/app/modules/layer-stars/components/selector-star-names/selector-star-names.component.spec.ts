import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { LayerService } from '#core/services/layer.service';
import { SelectorStarNamesComponent } from '#layer-stars/components/selector-star-names/selector-star-names.component';
import { StarsVisibilityManagerService } from '#layer-stars/services/visibility/stars-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { CoreModule } from '#core/core.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { SelectableItem } from '#core/models/selectable-item';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { StaticDataService } from '#core/services/static-data.service';


describe('SelectorStarNamesComponent', () => {

  const objects = [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ];

  let textsVisibilityManager: TextsVisibilityManagerService;
  let starsVisibilityManager: StarsVisibilityManagerService;
  let component: SelectorStarNamesComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));

    const layerService = TestBed.inject(LayerService);
    starsVisibilityManager = TestBed.inject(StarsVisibilityManagerService);
    textsVisibilityManager = TestBed.inject(TextsVisibilityManagerService);
    const starsCode = 'stars';
    const starsMag2Code = 'stars-mag2.0';
    const provider = TestBed.inject(StarsProvidersService);
    Promise.all([
      provider.getRenderableLayer(starsCode),
      provider.getRenderableLayer(starsMag2Code)
    ]).then(
      (layers: Array<RenderableLayer>) => {
        layerService.registerLayer(layers[0], 0);
        layerService.registerLayer(layers[1], 1);
      }
    ).then(
      (_: any) => layerService.setVisible(starsCode, true)
    );
    component = TestBed.createComponent(SelectorStarNamesComponent).componentInstance;
    tick();
  }));

  it('selectableNames should return expected value', () => {
    const selectables = component.selectableNames;
    expect(selectables).toBeDefined();
    const expectedLabels = ['None', 'Proper', 'Standard'];
    const gotNames = selectables.map((selectable: SelectableItem) => selectable.label);
    expect(gotNames).toEqual(expectedLabels);
  });

  describe('shownNames', () => {

    it('get should return expected value by default', () => {
      expect(component.shownNames).toEqual(1);
    });

    describe('set should', () => {

      describe('have no effect', () => {

        it('if the value is negative', () => {
          spyOn(textsVisibilityManager, 'setTextsVisible');
          component.shownNames = -1;
          expect(component.shownNames).toEqual(1);
          expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(0);
        });

        it('if the value is greater than the number of possible choices', () => {
          spyOn(textsVisibilityManager, 'setTextsVisible');
          component.shownNames = 3;
          expect(component.shownNames).toEqual(1);
          expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(0);
        });

        it('if the choice is the same than before', () => {
          spyOn(textsVisibilityManager, 'setTextsVisible');
          component.shownNames = 1;
          expect(component.shownNames).toEqual(1);
          expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(0);
        });

      });

      it('hide the names if the choice is "None"', () => {
        spyOn(textsVisibilityManager, 'setTextsVisible');
        component.shownNames = 0;
        expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(1);
      });

      it('trigger the showing of the standard names', () => {
        spyOn(textsVisibilityManager, 'setTextsVisible');
        spyOn(starsVisibilityManager, 'showStarsProperNames');
        component.shownNames = 2;
        expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(2);
        expect(starsVisibilityManager.showStarsProperNames).toHaveBeenCalledWith(false);
      });

      it('trigger the showing of the proper names', () => {
        component.shownNames = 2;
        spyOn(textsVisibilityManager, 'setTextsVisible');
        spyOn(starsVisibilityManager, 'showStarsProperNames');
        component.shownNames = 1;
        expect(textsVisibilityManager.setTextsVisible).toHaveBeenCalledTimes(2);
        expect(starsVisibilityManager.showStarsProperNames).toHaveBeenCalledWith(true);
      });

    });

  });

});
