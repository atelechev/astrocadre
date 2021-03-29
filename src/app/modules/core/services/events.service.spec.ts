import { skip } from 'rxjs/operators';
import { Dimension } from 'src/app/modules/core/models/dimension';
import { RenderableLayer } from 'src/app/modules/core/models/layers/renderable-layer';
import { Theme } from 'src/app/modules/core/models/theme';
import { EventsService } from 'src/app/modules/core/services/events.service';
import { mockedTheme } from 'src/app/modules/core/test-utils/mocked-theme.spec';


class MockedLayer extends RenderableLayer {

  constructor() {
    super(undefined, undefined, undefined);
  }

  protected applyTheme(): void { }

};


describe('EventsService', () => {

  let service: EventsService;

  beforeEach(() => {
    service = new EventsService();
  });

  describe('themeChanged', () => {

    it('should be defined', () => {
      expect(service.themeChanged).toBeDefined();
    });

    it('should be fired with fireThemeChanged', (done: DoneFn) => {
      service.themeChanged.pipe(
        skip(1) // skip the initial undefined
      ).subscribe(
        (theme: Theme) => {
          expect(theme).toEqual(mockedTheme);
          done();
        }
      );
      service.fireThemeChanged(mockedTheme);
    });

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

  describe('viewportChanged', () => {

    it('should be defined', () => {
      expect(service.viewportChanged).toBeDefined();
    });

    it('should be fired with fireViewportChanged', (done: DoneFn) => {
      const dimension: Dimension = {
        width: 1,
        height: 2
      };
      service.viewportChanged.pipe(
        skip(1) // skip the initial undefined
      ).subscribe(
        (dim: Dimension) => {
          expect(dim).toEqual(dimension);
          done();
        }
      );
      service.fireViewportChanged(dimension);
    });

  });

});
