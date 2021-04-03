import { skip } from 'rxjs/operators';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { EventsService } from '#core/services/events.service';


class MockedLayer extends RenderableLayer {

  constructor() {
    super(undefined);
  }

  public applyTheme(): void { }

};


describe('EventsService', () => {

  let service: EventsService;

  beforeEach(() => {
    service = new EventsService();
  });

  describe('layerShown', () => {

    it('should be defined', () => {
      expect(service.layerShown).toBeDefined();
    });

    it('should be fired with fireLayerShown', (done: DoneFn) => {
      const mockedLayer = new MockedLayer();
      service.layerShown.pipe(
        skip(1) // skip the initial undefined
      ).subscribe(
        (layer: RenderableLayer) => {
          expect(layer).toEqual(mockedLayer);
          done();
        }
      );
      service.fireLayerShown(mockedLayer);
    });

  });

  describe('layerHidden', () => {

    it('should be defined', () => {
      expect(service.layerHidden).toBeDefined();
    });

    it('should be fired with fireLayerHidden', (done: DoneFn) => {
      const mockedLayer = new MockedLayer();
      service.layerHidden.pipe(
        skip(1) // skip the initial undefined
      ).subscribe(
        (layer: RenderableLayer) => {
          expect(layer).toEqual(mockedLayer);
          done();
        }
      );
      service.fireLayerHidden(mockedLayer);
    });

  });

});
