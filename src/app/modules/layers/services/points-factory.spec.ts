import { TestBed } from '@angular/core/testing';
import { BufferGeometry } from 'three';
import { assertGeometryExpected, assertSegmentsArgMustBeDefined, assertSegmentsArgMustNotBeEmpty } from '#layers/services/object3d-factory.spec';
import { PointsFactory } from '#layers/services/points-factory';
import { Layers } from '#core/models/layers';

describe('PointsFactory', () => {

  const layer = Layers.STARS;

  let service: PointsFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PointsFactory] });
    service = TestBed.inject(PointsFactory);
  });

  describe('createObject3D should throw expected error', () => {

    it('if segments arg is undefined', () => {
      assertSegmentsArgMustBeDefined(() => service.createObject3D(layer, undefined));
    });

    it('if segments arg is empty', () => {
      assertSegmentsArgMustNotBeEmpty(() => service.createObject3D(layer, []));
    });

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
