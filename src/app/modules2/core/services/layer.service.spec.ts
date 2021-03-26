import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableLayer } from 'src/app/modules2/core/models/layers/renderable-layer';
import { Stars } from 'src/app/modules2/core/models/layers/stars';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { LayersFactoryService } from 'src/app/modules2/core/services/layers-factory.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { SearchService } from 'src/app/modules2/core/services/search.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import { MockStaticDataService } from 'src/app/modules2/core/test-utils/mock-static-data-service.spec';
import { mockedLayers } from 'src/app/modules2/core/test-utils/mocked-layers.spec';


describe('LayerService', () => {

  let service: LayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        CameraService,
        EventsService,
        LayerService,
        LayersFactoryService,
        MaterialsService,
        {
          provide: StaticDataService,
          useClass: MockStaticDataService
        },
        SceneService,
        SearchService,
        ThemeService,
        ViewportService
      ]
    });
    service = TestBed.inject(LayerService);
  });

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

  const getSubRenderables = (code: string): Array<RenderableLayer> =>
    service.getRenderableLayer(code)
      .model
      .subLayers
      .map((subLayer: Layer) => service.getRenderableLayer(subLayer.code));

  it('rootLayer should return expected value', waitForAsync(() => {
    setTimeout(() => {
      expect(service.rootLayer).toEqual(mockedLayers);
    });
  }));

  describe('isShown should return', () => {

    describe('false', () => {

      it('if the arg is falsy', () => {
        expect(service.isShown(undefined)).toBeFalse();
      });

      it('if the layer is not shown', () => {
        expect(service.isShown('stars-mag12.0')).toBeFalse();
      });

    });

    it('true if the layer is expected to be shown', waitForAsync(() => {
      setTimeout(() => {
        const skyGrid = service.rootLayer.subLayers[0];
        expect(skyGrid).toBeDefined();
        expect(service.isShown(skyGrid.code)).toBeTrue();
      });
    }));

  });

  describe('getRenderableLayer should return', () => {

    describe('undefined', () => {

      it('if the arg is undefined', () => {
        expect(service.getRenderableLayer(undefined)).toBeUndefined();
      });

      it('if the layer was not found', () => {
        expect(service.getRenderableLayer('no-layer')).toBeUndefined();
      });

      it('for the root layer', () => {
        expect(service.getRenderableLayer('root')).toBeUndefined();
      });

    });

    it('expected layer of an inner level', () => {
      const code = 'sky-grid';
      const layer = service.getRenderableLayer(code);
      expect(layer).toBeDefined();
      expect(layer.model.code).toEqual(code);
    });

  });

  describe('showLayer should', () => {

    it('have no effect if the arg is falsy', waitForAsync(() => {
      setTimeout(() => {
        service.showLayer(undefined);
        expect(service.isShown(undefined)).toBeFalse();
      });
    }));

    it('show the layer and its sub-layers', waitForAsync(() => {
      setTimeout(() => {
        service.showLayer('stars');
        assertLayersShown(['stars', 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
      });
    }));

  });

  describe('hideLayer should', () => {

    it('have no effect if the arg is falsy', waitForAsync(() => {
      setTimeout(() => {
        service.hideLayer(undefined);
        expect(service.isShown(undefined)).toBeFalse();
      });
    }));

    it('hide the layer and its sub-layers', waitForAsync(() => {
      setTimeout(() => {
        service.hideLayer('stars');
        assertLayersHidden(['stars', 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
      });
    }));

  });

  describe('showStarLayersDownToMagnitude should', () => {

    const assertAllLayersShown = (): void => {
      assertLayersShown(['sky-grid', 'stars', 'stars-mag2.0', 'stars-mag2.5', 'stars-mag3.0']);
    };

    it('hide all the star layers of magnitude greater than the argument', waitForAsync(() => {
      setTimeout(() => {
        assertAllLayersShown();
        service.showStarLayersDownToMagnitude(2);
        assertLayersShown(['sky-grid', 'stars', 'stars-mag2.0']);
        assertLayersHidden(['stars-mag2.5', 'stars-mag3.0']);
      });
    }));

    it('have no effect if the arg is falsy', waitForAsync(() => {
      setTimeout(() => {
        assertAllLayersShown();
        service.showStarLayersDownToMagnitude(undefined);
        assertAllLayersShown();
      });
    }));

  });

  it('showTexts should show the texts of the layer and its sub-layers', waitForAsync(() => {
    setTimeout(() => {
      const code = 'stars';
      const renderable = service.getRenderableLayer(code);
      expect(renderable).toBeDefined();
      service.showTexts(renderable);
      expect(renderable.areTextsShown).toBeTrue();
      getSubRenderables(code)
        .forEach(
          (subLayer: RenderableLayer) =>
            expect(subLayer.areTextsShown).toBeTrue()
        );
    });
  }));

  it('hideTexts should hide the texts of the layer and its sub-layers', waitForAsync(() => {
    setTimeout(() => {
      const code = 'stars';
      const renderable = service.getRenderableLayer(code);
      expect(renderable).toBeDefined();
      service.hideTexts(renderable);
      expect(renderable.areTextsShown).toBeFalse();
      getSubRenderables(code)
        .forEach(
          (subLayer: RenderableLayer) =>
            expect(subLayer.areTextsShown).toBeFalse()
        );
    });
  }));

  describe('showStarsProperNames should', () => {

    it('show the proper names if useProper is true', waitForAsync(() => {
      setTimeout(() => {
        const code = 'stars';
        service.showStarsProperNames(true);
        const layer = service.getRenderableLayer(code) as Stars;
        expect(layer.properNamesShown).toBeTrue();
        getSubRenderables(code)
          .forEach(
            (subLayer: Stars) =>
              expect(subLayer.properNamesShown).toBeTrue()
          );
      });
    }));

    it('show the standard names if useProper is false', waitForAsync(() => {
      setTimeout(() => {
        const code = 'stars';
        service.showStarsProperNames(false);
        const layer = service.getRenderableLayer(code) as Stars;
        expect(layer.properNamesShown).toBeFalse();
        getSubRenderables(code)
          .forEach(
            (subLayer: Stars) =>
              expect(subLayer.properNamesShown).toBeFalse()
          );
      });
    }));

  });

});
