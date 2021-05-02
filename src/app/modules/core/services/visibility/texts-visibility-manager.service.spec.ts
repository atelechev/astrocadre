import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { CoreModule } from '#core/core.module';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { toVector3 } from '#core/utils/vector-utils';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';


const code = 'test';

class TestLayer extends RenderableLayer {

  constructor() {
    super(code, [], 'Test');
  }

  public get texts(): Array<RenderableText> {
    return [
      new RenderableText(toVector3(0, 0, 0), code, TextOffsetPolicies.CENTERED)
    ];
  }

  public applyTheme(): void {
    // nothing
  }

}

describe('TextsVisibilityManagerService', () => {
  ;
  let manager: TextsVisibilityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });
    const layer = new TestLayer();
    const layerService = TestBed.inject(LayerService);
    layerService.registerLayer(layer, 100);
    layerService.setVisible(layer.code, true);
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
        manager.setTextsVisible(code, true);
      });

      it('when the texts of a layer are hidden', (done: DoneFn) => {
        assertEventPropagated(TextsHiddenEvent.KEY, done);
        manager.setTextsVisible(code, false);
      });

    });

  });

});
