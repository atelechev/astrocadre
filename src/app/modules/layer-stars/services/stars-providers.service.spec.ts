import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreModule } from '#core/core.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { StarsProvidersService } from '#layer-stars/services/stars-providers.service';
import { LayerStarsControlsComponent } from '#layer-stars/components/layer-stars-controls/layer-stars-controls.component';
import { Stars } from '#layer-stars/models/stars';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { StaticDataService } from '#core/services/static-data.service';


describe('StarsProvidersService', () => {

  const objects = [
    [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
  ];
  const starsCode = Stars.CODE;
  let service: StarsProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    const dataService = TestBed.inject(StaticDataService);
    spyOn(dataService, 'getDataJson').and.returnValue(of(objects));
    service = TestBed.inject(StarsProvidersService);
  });

  describe('getRenderableLayer should return', () => {

    describe('the agregate layer', () => {

      it('for the "stars" code arg', (done: DoneFn) => {
        service.getRenderableLayer('stars').then(
          (layer: RenderableLayer) => {
            expect(layer).toBeDefined();
            expect(layer.subLayers.length).toEqual(9);
            done();
          }
        );
      });

      it('for undefined code arg', (done: DoneFn) => {
        service.getRenderableLayer(undefined).then(
          (layer: RenderableLayer) => {
            expect(layer).toBeDefined();
            expect(layer.subLayers.length).toEqual(9);
            done();
          }
        );
      });

    });

    it('expected layer for a stars sub-layer code', (done: DoneFn) => {
      service.getRenderableLayer('stars-mag2.0').then(
        (layer: Stars) => {
          expect(layer).toBeDefined();
          expect(layer.magnitudeClass).toEqual(2);
          expect(layer.subLayers.length).toEqual(0);
          done();
        }
      );
    });

    it('rejected promise if the arg was not matched', (done: DoneFn) => {
      service.getRenderableLayer('sky-grid').then(
        (_: Stars) => fail('Must not be resolved!'),
        (reason: string) => {
          expect(reason).toEqual('Unexpected layer code: sky-grid');
          done();
        }
      );
    });

  });

  describe('getUiControlsComponentType should return', () => {

    it('expected value for the "stars" layer arg', () => {
      expect(service.getUiControlsComponentType(starsCode)).toEqual(LayerStarsControlsComponent);
    });

    describe('undefined', () => {

      it('for a falsy arg', () => {
        expect(service.getUiControlsComponentType(undefined)).toBeUndefined();
      });

      it('for unmatched layer arg', () => {
        expect(service.getUiControlsComponentType('constellations')).toBeUndefined();
      });

    });

  });

});
