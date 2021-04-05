import { TestBed } from '@angular/core/testing';
import { Layer } from '#core/models/layers/layer';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SearchService } from '#core/services/search.service';


describe('LayersFactoryService', () => {

  let service: LayersFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayersFactoryService,
        SearchService
      ]
    });
    service = TestBed.inject(LayersFactoryService);
  });

  describe('buildRenderableLayer should', () => {

    describe('return', () => {

      describe('undefined', () => {

        it('if the arg is falsy', () => {
          expect(service.buildRenderableLayer(undefined)).toBeUndefined();
        });

        it('if the layer code is unsupported', () => {
          const layer: Layer = {
            code: 'wrong',
            label: 'Wrong',
            loadFromUrl: false,
            objects: []
          };
          expect(service.buildRenderableLayer(layer)).toBeUndefined();
        });

        it('for the root layer', () => {
          expect(service.buildRenderableLayer(mockedLayers)).toBeUndefined();
        });

      });

      it('expected renderable layer for valid arg', () => {
        const layer: Layer = {
          code: 'sky-grid',
          label: 'Coordinates grid',
          loadFromUrl: false,
          objects: []
        };
        const renderable = service.buildRenderableLayer(layer);
        expect(renderable).toBeDefined();
        expect(renderable.code).toEqual(layer.code);
        expect(renderable.label).toEqual(layer.label);
        expect(renderable.loadFromUrl).toEqual(layer.loadFromUrl);
        expect(renderable.objects.length).toEqual(4);
      });

      it('expected renderable layer for a sub-layer of stars', () => {
        const layer: Layer = {
          code: 'stars-mag2.0',
          label: 'Magnitude < 2.0',
          loadFromUrl: false,
          objects: []
        };
        const renderable = service.buildRenderableLayer(layer);
        expect(renderable).toBeDefined();
        expect(renderable.code).toEqual(layer.code);
      });

    });

    it('register searchable items in the SearchService', () => {
      const searchService = TestBed.inject(SearchService);
      expect(searchService.searchablesCount).toEqual(0);

      const layer: Layer = {
        code: 'stars-mag2.0',
        label: 'Magnitude < 2.0',
        loadFromUrl: false,
        objects: [[37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']]
      };
      service.buildRenderableLayer(layer);
      expect(searchService.searchablesCount).toEqual(2);
    });

  });

});
