import { TestBed } from '@angular/core/testing';
import { BufferGeometry } from 'three';
import { PointsFactory } from '#core/models/layers/factories/points-factory';
import { SupportedLayers } from '#core/models/layers/supported-layers';
import { assertGeometryExpected } from '#core/test-utils/assertions-geometry.spec';


describe('PointsFactory', () => {

  const layer = SupportedLayers.STARS;

  let service: PointsFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PointsFactory] });
    service = TestBed.inject(PointsFactory);
  });

  it('createObject3D should throw expected error if segments arg is falsy', () => {
    expect(() => service.createObject3D(layer, undefined)).toThrowError('segments arg must be defined');
  });

  describe('toObject3D should', () => {

    describe('return expected object', () => {

      it('for a single point', () => {
        const expected = [[0.020, 0.016, 1.960]];
        const merged = service.createObject3D(layer, [[37.95, 89.26]]);
        assertGeometryExpected(merged.geometry as BufferGeometry, expected);
      });

      it('for multiple points', () => {
        const expected = [[0.020, 0.016, 1.960], [0.382, 1.902, -0.280]];
        const merged = service.createObject3D(layer, [[37.95, 89.26], [78.63, -8.2]]);
        assertGeometryExpected(merged.geometry as BufferGeometry, expected);
      });

    });

    it('throw expected error if at least one sud-array is invalid', () => {
      expect(() => service.createObject3D(layer, [[0.020, 0.016, 2.0], []]))
        .toThrow(new Error('invalid point definition: \'\''));
    });

  });

});
