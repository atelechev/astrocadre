import { TestBed } from '@angular/core/testing';
import { PointsFactory } from './points-factory';
import { BufferGeometry } from 'three';
import { Layers } from '../../core/layers';
import { assertSegmentsArgMustBeDefined, assertSegmentsArgMustNotBeEmpty, assertGeometryExpected } from './object3d-factory.spec';

describe('PointsFactory', () => {

  const layer = Layers.STARS;

  let service: PointsFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ PointsFactory ] });
    service = TestBed.get(PointsFactory);
  });

  it('#createObject3D should throw expected error if segments arg is undefined', () => {
    assertSegmentsArgMustBeDefined(() => service.createObject3D(layer, undefined));
  });

  it('#createObject3D should throw expected error if segments arg is empty', () => {
    assertSegmentsArgMustNotBeEmpty(() => service.createObject3D(layer, []));
  });

  it('#toObject3D should return expected object for a single point', () => {
    const expected = [[ 0.020, 0.016, 1.960 ]];
    const merged = service.createObject3D(layer, [[ 37.95, 89.26 ]]);
    assertGeometryExpected(<BufferGeometry> merged.geometry, expected);
  });

  it('#toObject3D should return expected object for multiple points', () => {
    const expected = [[ 0.020, 0.016, 1.960 ], [ 0.382, 1.902, -0.280]];
    const merged = service.createObject3D(layer, [[ 37.95, 89.26 ], [ 78.63, -8.2 ]]);
    assertGeometryExpected(<BufferGeometry> merged.geometry, expected);
  });

  it('#toObject3D should throw expected error if at least one sud-array is invalid', () => {
    expect(() => service.createObject3D(layer, [[ 0.020, 0.016, 2.0 ], []]))
      .toThrow(new Error('invalid point definition: \'\''));
  });

});
