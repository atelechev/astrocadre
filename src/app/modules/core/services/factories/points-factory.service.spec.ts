import { TestBed } from '@angular/core/testing';
import { BufferGeometry, Vector3 } from 'three';
import { PointsFactoryService } from '#core/services/factories/points-factory.service';
import { assertGeometryExpected } from '#core/test-utils/assertions-geometry.spec';
import { CoreModule } from '#core/core.module';
import { Stars } from '#layer-stars/models/stars';


describe('PointsFactoryService', () => {

  const layerCode = Stars.CODE;

  let factory: PointsFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });
    factory = TestBed.inject(PointsFactoryService);
  });

  it('createObject3D should throw expected error if segments arg is falsy', () => {
    expect(() => factory.createObject3D(layerCode, undefined)).toThrowError('segments arg must be defined');
  });

  describe('toObject3D should', () => {

    describe('return expected object', () => {

      it('for a single point', () => {
        const expected = [[0.020, 0.016, 2.0]];
        const merged = factory.createObject3D(layerCode, [[37.95, 89.26]]);
        assertGeometryExpected(merged.geometry as BufferGeometry, expected);
      });

      it('for multiple points', () => {
        const expected = [[0.020, 0.016, 2.0], [0.390, 1.941, -0.285]];
        const merged = factory.createObject3D(layerCode, [[37.95, 89.26], [78.63, -8.2]]);
        assertGeometryExpected(merged.geometry as BufferGeometry, expected);
      });

    });

    it('throw expected error if at least one sud-array is invalid', () => {
      expect(() => factory.createObject3D(layerCode, [[0.020, 0.016, 2.0], []]))
        .toThrow(new Error('invalid point definition: \'\''));
    });

  });

  it('buildPoint should return expected value', () => {
    const built = factory.buildPoint(Stars.CODE, 37.95, 89.26);
    expect(built).toBeDefined();
    expect(built.x).toBeCloseTo(0.020);
    expect(built.y).toBeCloseTo(0.016);
    expect(built.z).toBeCloseTo(1.999);
  });

});
