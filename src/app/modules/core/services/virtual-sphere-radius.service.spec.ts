import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { RenderableLayer } from '#core/models/layers/renderable-layer';

class TestLayer extends RenderableLayer {

  constructor(code: string) {
    super(code, [], 'Test');
  }

  public applyTheme(): void {
    // nothing
  }

}

describe('VirtualSphereRadiusService', () => {

  let service: VirtualSphereRadiusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayerService,
        ThemeService,
        VirtualSphereRadiusService
      ]
    });
    service = TestBed.inject(VirtualSphereRadiusService);
  });

  it('maxRadius should return expected value', () => {
    expect(service.maxRadius).toEqual(2);
  });

  describe('getRadiusFor should return', () => {

    describe('maxRadius', () => {

      it('if the arg is falsy', () => {
        expect(service.getRadiusFor(undefined)).toEqual(2);
      });

      it('if the layer with this code does not exist', () => {
        expect(service.getRadiusFor('any')).toEqual(2);
      });

    });

    it('expected value for supported layer', () => {
      const layerService = TestBed.inject(LayerService);
      const code1 = 'code1';
      const code2 = 'code2';
      layerService.registerLayer(new TestLayer(code1), 0);
      layerService.registerLayer(new TestLayer(code2), 1);

      expect(service.getRadiusFor(code1)).toEqual(2);
      expect(service.getRadiusFor(code2)).toEqual(1.99);
    });

  });

});
