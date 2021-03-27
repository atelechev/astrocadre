import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { TextOffsetPolicies } from 'src/app/modules2/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
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
import { toVector3 } from 'src/app/modules2/core/utils/vector-utils';


describe('SceneService', () => {


  let service: SceneService;
  let layers: LayerService;

  beforeEach(fakeAsync(() => {
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
        SearchService,
        SceneService,
        {
          provide: StaticDataService,
          useClass: MockStaticDataService
        },
        ThemeService,
        ViewportService
      ]
    });
    layers = TestBed.inject(LayerService);
    service = TestBed.inject(SceneService);
    service.setViewportRootElement(document.createElement('div'));
  }));

  /*
    The loaded mocked data contain:
    - 3D objects:
      - 4 objects: the generated sky-grid layer contains 2 for regular lines and 2 for reference lines.
      - 3 objects: at the coords origin, for the camera.
      - 1 object: star object for the stars-mag2.0 layer.
    - texts:
      - 1 object: the name of the loaded star (Polaris).
  */

  it('allObjectsCount should return expected value', () => {
    expect(service.allObjectsCount).toEqual(8);
  });

  it('shownObjectsCount should return expected value', () => {
    expect(service.shownObjectsCount).toEqual(8);
  });

  it('allTextsCount should return expected value', () => {
    expect(service.allTextsCount).toEqual(1);
  });

  describe('showTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(1);
      service.showTexts(undefined);
      expect(service.allTextsCount).toEqual(1);
    });

    it('should add the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      expect(service.allTextsCount).toEqual(1);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(2);
    });

  });

  describe('hideTexts should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(service.allTextsCount).toEqual(1);
      service.hideTexts(undefined);
      expect(service.allTextsCount).toEqual(1);
    });

    it('should hide the texts', () => {
      const text = new RenderableText('any', 'labels', toVector3(0, 0, 0), 'any', TextOffsetPolicies.CENTERED);
      service.showTexts([text]);
      expect(service.allTextsCount).toEqual(2);
      service.hideTexts([text]);
      expect(service.allTextsCount).toEqual(1);
    });

  });

  it('should add all the objects and texts from a layer when it is shown', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(8);
    expect(service.allTextsCount).toEqual(1);
  });

  it('should remove all the objects and texts from a layer when it is hidden', () => {
    const layer = layers.getRenderableLayer('stars-mag2.0') as Stars;
    const events = TestBed.inject(EventsService);
    events.fireLayerHidden(layer);
    expect(layer.objects.length).toEqual(1);
    expect(layer.texts.length).toEqual(1);
    expect(service.shownObjectsCount).toEqual(7);
    expect(service.allTextsCount).toEqual(0);
  });

});
