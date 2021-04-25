import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { MockedGridLayerFactory } from '#core/test-utils/mocked-grid-layer-factory.spec';
import { CoreModule } from '#core/core.module';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';


describe('TextsVisibilityManagerService', () => {

  const code = SkyGrid.CODE;
  let manager: TextsVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        MockedGridLayerFactory
      ]
    });
    const layer = TestBed.inject(MockedGridLayerFactory).buildRenderableLayer();
    const layerService = TestBed.inject(LayerService);
    layerService.registerLayer(layer);
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
        manager.showTexts(code);
      });

      it('when the texts of a layer are hidden', (done: DoneFn) => {
        assertEventPropagated(TextsHiddenEvent.KEY, done);
        manager.hideTexts(code);
      });

    });

  });

});
