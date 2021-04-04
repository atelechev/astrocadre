import { LayerService } from '#core/services/layer.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { TestContext } from '#core/test-utils/test-context.spec';


describe('LayerService', () => {

  const starsMag2 = 'stars-mag2.0';
  const skyGrid = 'sky-grid';
  let service: LayerService;

  beforeEach(() => {
    const ctx = new TestContext().configure();
    service = ctx.layerService;
    service.registerLayer(mockedLayers);
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
      service.registerLayer(mockedLayers.subLayers[0]);

      const layer = service.getRenderableLayer(skyGrid);
      expect(layer).toBeDefined();
      expect(layer.code).toEqual(skyGrid);
    });

  });

  describe('getModel should return', () => {

    it('undefined if the arg is falsy', () => {
      expect(service.getModel(undefined)).toBeUndefined();
    });

    it('undefined if the layer was not found', () => {
      expect(service.getModel('stars-mag8.0')).toBeUndefined();
    });

    it('expected object if the layer model was found', () => {
      const layer = {
        code: starsMag2,
        label: 'Magnitude < 2.0',
        loadFromUrl: true,
        description: 'Stars of magnitude less or equal to 2.0',
        objects: [
          [37.95, 89.26, 2.0, 'Polaris', 'ALP UMI']
        ]
      };
      service.registerLayer(layer);

      const model = service.getModel(starsMag2);
      expect(model).toBeDefined();
      expect(model.code).toEqual(starsMag2);
    });

  });

});

