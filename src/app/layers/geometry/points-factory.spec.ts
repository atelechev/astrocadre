import { TestBed } from '@angular/core/testing';
import { PointsFactory } from './points-factory';
import { Constants } from '../../core/constants';
import { Object3D, BufferGeometry } from 'three';
import { Layers } from '../../core/layers';

describe('PointsFactory', () => {

  const layer = Layers.STARS;

  let service: PointsFactory;

  beforeEach(() => {
    TestBed.configureTestingModule(
      { providers: [ PointsFactory ] });
    service = TestBed.get(PointsFactory);
  });

  it('#createObject3D should throw expected error if segments arg is undefined', () => {
    expect(() => service.createObject3D(layer, undefined))
      .toThrow(new Error('segments arg must be defined, but was \'undefined\''));
  });

  it('#createObject3D should throw expected error if segments arg is empty', () => {
    expect(() => service.createObject3D(layer, []))
      .toThrow(new Error('segments arg must be defined, but was \'[]\''));
  });

  const assertGeometryExpected = (checked: BufferGeometry, expected: number[][]): void => {
    const vertices = checked.getAttribute('position').array;
    const precision = 3;
    expect(vertices.length).toBe(expected.length * 3);
    for (let i = 0; i < expected.length; i++) {
      const vertex = expected[i];
      expect(vertices[i * 3]).toBeCloseTo(vertex[0], precision);
      expect(vertices[i * 3 + 1]).toBeCloseTo(vertex[1], precision);
      expect(vertices[i * 3 + 2]).toBeCloseTo(vertex[2], precision);
    }
  };

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
