import { WorldConstants } from 'src/app/modules/core/models/world-constants';


describe('WorldConstants', () => {

  it('WORLD_RADIUS should have expected value', () => {
    expect(WorldConstants.WORLD_RADIUS).toEqual(2);
  });

  describe('worldRadiusForLayer should return expected value', () => {

    it('if the arg is falsy', () => {
      expect(WorldConstants.worldRadiusForLayer(undefined)).toEqual(2);
    });

    it('if the arg does not match a layer', () => {
      expect(WorldConstants.worldRadiusForLayer('any')).toEqual(2);
    });

    it('for the constellation boundaries layer', () => {
      expect(WorldConstants.worldRadiusForLayer('constellation-boundaries')).toEqual(1.99);
    });

    it('for the constellation lines layer', () => {
      expect(WorldConstants.worldRadiusForLayer('constellation-lines')).toEqual(1.98);
    });

    it('for the stars layer', () => {
      expect(WorldConstants.worldRadiusForLayer('stars')).toEqual(1.96);
    });

  });

});
