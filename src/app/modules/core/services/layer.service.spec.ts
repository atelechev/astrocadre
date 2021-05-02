import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { SearchService } from '#core/services/search.service';
import { LayerEvent } from '#core/models/event/layer-event';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';



const codeVisible = 'test-visible';
const codeSubLayer = 'test-sub-layer';
const codeHidden = 'test-hidden';
const indexVisible = 98;
const indexSubLayer = 99;
const indexHidden = 100;

class TestLayer extends RenderableLayer {

  constructor(code: string, subLayers: Array<string> = []) {
    super(code, subLayers, 'Test');
  }

  public applyTheme(): void {
    // nothing
  }

}


const theme: Theme = {
  code: 'test-theme',
  label: 'Test theme',
  background: {
    color: 'white'
  },
  layers: [
    {
      code: codeVisible,
      visibleOnLoad: true
    },
    {
      code: codeHidden,
      visibleOnLoad: false
    }
  ]
};


describe('LayerService', () => {

  let service: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        SearchService,
        ThemeService
      ]
    });
    service = TestBed.inject(LayerService);
    TestBed.inject(ThemeService).theme = theme;
  });

  const loadVisibleLayer = (withSubLayer: boolean = false): void => {
    const subLayers = withSubLayer ? [codeSubLayer] : [];
    const layer = new TestLayer(codeVisible, subLayers);
    service.registerLayer(layer, indexVisible);
    if (withSubLayer) {
      const subLayer = new TestLayer(codeSubLayer);
      service.registerLayer(subLayer, indexSubLayer);
    }
  };

  const loadHiddenLayer = (): void => {
    const layer = new TestLayer(codeHidden);
    service.registerLayer(layer, indexHidden);
  };

  const assertLayersShown = (expectedShown: Array<string>): void => {
    expectedShown.forEach(
      (code: string) => expect(service.isShown(code)).toBeTrue()
    );
  };

  const assertLayersHidden = (expectedHidden: Array<string>): void => {
    expectedHidden.forEach(
      (code: string) => expect(service.isShown(code)).toBeFalse()
    );
  };

  describe('getRenderableLayer should return', () => {

    describe('undefined', () => {

      it('if the arg is undefined', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the layer was not found', () => {
        expect(service.getRenderableLayer('no-layer')).toBeUndefined();
      });

    });

    it('expected layer for existing code', () => {
      loadVisibleLayer();

      const layer = service.getRenderableLayer(codeVisible);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(codeVisible);
    });

  });

  describe('getIndex should return', () => {

    it('expected indices for existing layers', () => {
      loadVisibleLayer(true);
      loadHiddenLayer();

      expect(service.getIndex(codeVisible)).toEqual(indexVisible);
      expect(service.getIndex(codeSubLayer)).toEqual(indexSubLayer);
      expect(service.getIndex(codeHidden)).toEqual(indexHidden);
    });

    describe('-1', () => {

      it('if the arg is falsy', () => {
        expect(service.getIndex(undefined)).toEqual(-1);
      });

      it('for an unsupported layer', () => {
        expect(service.getIndex('tesla-roadster')).toEqual(-1);
      });

    });

  });

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(service.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        loadHiddenLayer();
        expect(service.isShown(codeHidden)).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', () => {
      loadVisibleLayer();
      service.setVisible(codeVisible, true);

      expect(service.isShown(codeVisible)).toBeTrue();
    });

  });

  describe('events should', () => {

    const assertEventPropagated = (expectedKey: string, expectedLayer: string, done: DoneFn): void => {
      service.events
        .pipe(skip(1))
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event.key).toEqual(expectedKey);
            expect(event.data.code).toEqual(expectedLayer);
            done();
          }
        );
    };

    it('be defined when the service is initialized and emit the expected initial event', (done: DoneFn) => {
      expect(service.events).toBeDefined();
      service.events
        .subscribe(
          (event: LayerEvent<any>) => {
            expect(event).toEqual(LayerEvent.INITIAL);
            done();
          }
        );
    });

    describe('propagate an event', () => {

      it('when a layer is shown', (done: DoneFn) => {
        loadHiddenLayer();

        assertEventPropagated(LayerShownEvent.KEY, codeHidden, done);
        service.setVisible(codeHidden, true);
      });

      it('when a layer is hidden', (done: DoneFn) => {
        loadVisibleLayer();
        assertEventPropagated(LayerHiddenEvent.KEY, codeVisible, done);
        service.setVisible(codeVisible, false);
      });

    });

  });

  describe('setVisible should', () => {

    it('have no effect if the arg is falsy', () => {
      service.setVisible(undefined, true);
      expect(service.isShown(undefined)).toBeFalse();
    });

    it('show the layer and its sub-layers if the 2nd arg is true', () => {
      loadVisibleLayer(true);

      service.setVisible(codeVisible, true);
      assertLayersShown([codeVisible, codeSubLayer]);
    });

    it('hide the layer and its sub-layers if the 2nd arg is false', () => {
      loadVisibleLayer(true);

      service.setVisible(codeVisible, false);
      assertLayersHidden([codeVisible, codeSubLayer]);
    });

  });

  describe('registerLayer should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.layersCount).toEqual(0);
      service.registerLayer(undefined, 1);
      expect(service.layersCount).toEqual(0);
    });

    it('register the expected layer', () => {
      expect(service.layersCount).toEqual(0);
      expect(service.getIndex(codeVisible)).toEqual(-1);
      expect(service.getRenderableLayer(codeVisible)).toBeUndefined();

      loadVisibleLayer();
      expect(service.layersCount).toEqual(1);
      expect(service.getRenderableLayer(codeVisible)).toBeDefined();
      expect(service.getIndex(codeVisible)).toEqual(indexVisible);
    });

    describe('throw expected error', () => {

      it('if the index is not unique', () => {
        loadVisibleLayer();
        const anotherLayer = new TestLayer('another');
        expect(() => service.registerLayer(anotherLayer, indexVisible)).toThrowError('The layer index 98 is already allocated!');
      });

      it('if the index is falsy', () => {
        const anotherLayer = new TestLayer('another');
        expect(() => service.registerLayer(anotherLayer, undefined)).toThrowError('The layer index must be 0 or greater.');
      });

    });

  });

  describe('layersCount should return', () => {

    it('0 when the service is initialized', () => {
      expect(service.layersCount).toEqual(0);
    });

    it('expected value when there are registered layers', () => {
      loadVisibleLayer(true);
      expect(service.layersCount).toEqual(2);
    });

  });

});

