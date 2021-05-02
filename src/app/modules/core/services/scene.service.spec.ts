import { TestBed } from '@angular/core/testing';
import { LineSegments, Object3D } from 'three';
import { LayerService } from '#core/services/layer.service';
import { SceneService } from '#core/services/scene.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { CoreModule } from '#core/core.module';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { toVector3 } from '#core/utils/vector-utils';
import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';

const code = 'test';

class TestLayer extends RenderableLayer {

  constructor() {
    super(code, [], 'Test');
  }

  public applyTheme(): void {
    // nothing
  }

  public get objects(): Array<Object3D> {
    return [new LineSegments()];
  }

  public get texts(): Array<RenderableText> {
    return [
      new RenderableText(toVector3(0, 0, 0), 'Rendered!', TextOffsetPolicies.CENTERED)
    ];
  }

  /**
   * Returns the array of searchable objects belonging to this layer.
   */
  public get searchables(): Array<Searchable> {
    return [{
      type: 'test',
      code: 'TEST',
      ra: 0,
      dec: 0,
      names: ['the test']
    }];
  }

}

describe('SceneService', () => {

  let service: SceneService;
  let layerService: LayerService;
  let layer: RenderableLayer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });
    layerService = TestBed.inject(LayerService);
    service = TestBed.inject(SceneService);
    service.setViewportRootElement(document.createElement('div'));

    layer = new TestLayer();
    layerService.registerLayer(layer, 100);
  });

  describe('allObjectsCount should return expected value', () => {

    it('when there are no visible layers', () => {
      expect(service.allObjectsCount).toEqual(0);
    });

    it('when there is a visible layer', () => {
      layerService.setVisible(code, true);
      expect(service.allObjectsCount).toEqual(1);
    });

  });

  describe('shownObjectsCount should return expected value', () => {

    it('when there are no visible layers', () => {
      expect(service.shownObjectsCount).toEqual(0);
    });

    it('when there is a visible layer', () => {
      layerService.setVisible(code, true);
      expect(service.shownObjectsCount).toEqual(1);
    });

  });

  describe('allTextsCount should return expected value', () => {

    it('when there are no visible layers', () => {
      expect(service.allTextsCount).toEqual(0);
    });

    it('when there is a visible layer', () => {
      layerService.setVisible(code, true);
      expect(service.allTextsCount).toEqual(1);
    });

  });

});
