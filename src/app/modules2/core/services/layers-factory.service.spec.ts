import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Layer } from 'src/app/modules2/core/models/layer';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayersFactoryService } from 'src/app/modules2/core/services/layers-factory.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { MockStaticDataService } from 'src/app/modules2/core/test-utils/mock-static-data-service.spec';
import { mockedLayers } from 'src/app/modules2/core/test-utils/mocked-layers.spec';


describe('LayersFactoryService', () => {

  let service: LayersFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EventsService,
        LayersFactoryService,
        MaterialsService,
        {
          provide: StaticDataService,
          useClass: MockStaticDataService
        },
        ThemeService
      ]
    });
    service = TestBed.inject(LayersFactoryService);
  });

  describe('buildRenderableLayer should return', () => {

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
      expect(renderable.model).toEqual(layer);
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
      expect(renderable.model).toEqual(layer);
    });

  });

});