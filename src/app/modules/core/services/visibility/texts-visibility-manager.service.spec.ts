import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';


describe('TextsVisibilityManagerService', () => {

  const starsMag2 = 'stars-mag2.0';
  const model = {
    code: starsMag2,
    label: 'Magnitude < 2.0',
    loadFromUrl: true,
    description: 'Stars of magnitude less or equal to 2.0',
    objects: [
      [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
    ]
  };
  let manager: TextsVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        LayersFactoryService,
        SearchService,
        TextsVisibilityManagerService,
        ThemeService
      ]
    });
    const layerService = TestBed.inject(LayerService);
    layerService.registerLayer(model);
    manager = TestBed.inject(TextsVisibilityManagerService);
  });

  describe('events should', () => {

    const assertEventPropagated = (expectedKey: string, done: DoneFn): void => {
      manager.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(expectedKey);
            expect(event.data.texts.length).toEqual(1);
            done();
          }
        );
    };

    it('be defined when the service is initialized and emit the expected initial event', (done: DoneFn) => {
      expect(manager.events).toBeDefined();
      manager.events
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event).toEqual(LayerEvent.INITIAL);
            done();
          }
        );
    });

    describe('propagate an event', () => {

      it('when the texts of a layer are shown', (done: DoneFn) => {
        assertEventPropagated(TextsShownEvent.KEY, done);
        manager.showTexts(starsMag2);
      });

      it('when the texts of a layer are hidden', (done: DoneFn) => {
        assertEventPropagated(TextsHiddenEvent.KEY, done);
        manager.hideTexts(starsMag2);
      });

    });

  });

});
