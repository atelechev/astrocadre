import { PointsFactory } from './points-factory';
import { Constants } from '../../core/constants';
import { Object3D, BufferGeometry } from 'three';
import { Layers } from '../../core/layers';

describe('PointsFactory', () => {

  const worldRadius = Constants.getWorldRadiusForLayer(undefined);

  // TODO
  const newMergedPoints = (segs: number[][], radius?: number): PointsFactory => {
    return new PointsFactory(segs, radius);
  };

  it('#constructor should throw expected error if segments arg is undefined', () => {
    expect(() => newMergedPoints(undefined, worldRadius))
      .toThrow(new Error('segments arg must be defined, but was \'undefined\''));
  });

  it('#constructor should throw expected error if segments arg is empty', () => {
    expect(() => newMergedPoints([], worldRadius))
      .toThrow(new Error('segments arg must be defined, but was \'[]\''));
  });

  it('#constructor should throw expected error if radius arg is undefined', () => {
    expect(() => newMergedPoints([[ 37.95, 89.26 ]]))
      .toThrow(new Error('radius arg must be defined, but was \'undefined\''));
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
    const expected = [[ 0.020, 0.016, 2.0 ]];
    const merged = newMergedPoints([[ 37.95, 89.26 ]], worldRadius).createObject3D();
    assertGeometryExpected(<BufferGeometry> merged.geometry, expected);
  });

  it('#toObject3D should return expected object for multiple points', () => {
    const expected = [[ 0.020, 0.016, 2.0 ], [ 0.390, 1.941, -0.285]];
    const merged = newMergedPoints([[ 37.95, 89.26 ], [ 78.63, -8.2 ]], worldRadius).createObject3D();
    assertGeometryExpected(<BufferGeometry> merged.geometry, expected);
  });

  it('#toObject3D should throw expected error if at least one sud-array is invalid', () => {
    expect(() => newMergedPoints([[ 0.020, 0.016, 2.0 ], []], worldRadius).createObject3D())
      .toThrow(new Error('invalid point definition: \'\''));
  });

});
