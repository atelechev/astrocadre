import { TestBed } from '@angular/core/testing';
import { LayerService } from '#core/services/layer.service';
import { ThemeService } from '#core/services/theme.service';
import { VirtualSphereRadiusService } from '#core/services/virtual-sphere-radius.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';


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
    const layerService = TestBed.inject(LayerService);
    layerService.rootLayer = mockedLayers;
  });

  it('maxRadius should return expected value', () => {
    expect(service.maxRadius).toEqual(2);
  });

  describe('getRadiusFor should return', () => {

    describe('maxRadius0', () => {

      it('if the arg is falsy', () => {
        expect(service.getRadiusFor(undefined)).toEqual(2);
      });

      it('if the layer with this code does not exist', () => {
        expect(service.getRadiusFor('any')).toEqual(2);
      });

    });

    it('should return expected values for supported layers', () => {
      expect(service.getRadiusFor('sky-grid')).toEqual(2);
      expect(service.getRadiusFor('stars')).toEqual(1.99);
      expect(service.getRadiusFor('stars-mag2.0')).toEqual(1.98);
      expect(service.getRadiusFor('stars-mag2.5')).toEqual(1.97);
      expect(service.getRadiusFor('stars-mag3.0')).toEqual(1.96);
      expect(service.getRadiusFor('constellations')).toEqual(1.95);
      expect(service.getRadiusFor('constellation-boundaries')).toEqual(1.94);
      expect(service.getRadiusFor('constellation-lines')).toEqual(1.93);
      expect(service.getRadiusFor('constellation-names')).toEqual(1.92);
      expect(service.getRadiusFor('messier')).toEqual(1.91);
    });

  });

});
