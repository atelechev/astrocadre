import { TestBed } from '@angular/core/testing';
import { BufferGeometry } from 'three';
import { assertGeometryExpected, assertSegmentsArgMustBeDefined, assertSegmentsArgMustNotBeEmpty } from '#layers/geometry/object3d-factory.spec';
import { Layers } from '#core/layers';
import { AxialCurvesFactory } from '#layers/geometry/axial-curves-factory';

describe('AxialCurvesFactory', () => {

  const layer = Layers.CONSTELLATION_BOUNDARIES;

  let service: AxialCurvesFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AxialCurvesFactory] });
    service = TestBed.get(AxialCurvesFactory);
  });

  it('#createObject3D should throw expected error if segments arg is undefined', () => {
    assertSegmentsArgMustBeDefined(() => service.createObject3D(layer, undefined));
  });

  it('#createObject3D should throw expected error if segments arg is empty', () => {
    assertSegmentsArgMustNotBeEmpty(() => service.createObject3D(layer, []));
  });

  it('#toObject3D should return expected object for a parallel segment, without intermediate points, rightwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 12, 15]]);
    const expected = [[1.893, 0.334, 0.515], [1.880, 0.400, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a parallel segment, without intermediate points, leftwards', () => {
    const merged = service.createObject3D(layer, [[12, 15, 10, 15]]);
    const expected = [[1.880, 0.400, 0.515], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a parallel segment, with one intermediate point, rightwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 16, 15]]);
    const expected = [[1.893, 0.334, 0.515], [1.873, 0.432, 0.515],
    [1.873, 0.432, 0.515], [1.848, 0.530, 0.515],];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a parallel segment, with one intermediate point, leftwards', () => {
    const merged = service.createObject3D(layer, [[16, 15, 10, 15]]);
    const expected = [[1.848, 0.530, 0.515], [1.873, 0.432, 0.515],
    [1.873, 0.432, 0.515], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a parallel segment, with multiple intermediate points, rightwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 21, 15]]);
    const expected = [[1.893, 0.334, 0.515], [1.868, 0.454, 0.515],
    [1.868, 0.454, 0.515], [1.835, 0.573, 0.515],
    [1.835, 0.573, 0.515], [1.795, 0.689, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a parallel segment, with multiple intermediate points, leftwards', () => {
    const merged = service.createObject3D(layer, [[21, 15, 10, 15]]);
    const expected = [[1.795, 0.689, 0.515], [1.835, 0.573, 0.515],
    [1.835, 0.573, 0.515], [1.868, 0.454, 0.515],
    [1.868, 0.454, 0.515], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, without intermediate points, upwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 10, 17]]);
    const expected = [[1.893, 0.334, 0.515], [1.874, 0.330, 0.582]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, without intermediate points, downwards', () => {
    const merged = service.createObject3D(layer, [[10, 17, 10, 15]]);
    const expected = [[1.874, 0.330, 0.582], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, with one intermediate point, upwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 10, 21]]);
    const expected = [[1.893, 0.334, 0.515], [1.864, 0.329, 0.615],
    [1.864, 0.329, 0.615], [1.830, 0.323, 0.713]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, with one intermediate point, downwards', () => {
    const merged = service.createObject3D(layer, [[10, 21, 10, 15]]);
    const expected = [[1.830, 0.323, 0.713], [1.864, 0.329, 0.615],
    [1.864, 0.329, 0.615], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, with multiple intermediate points, upwards', () => {
    const merged = service.createObject3D(layer, [[10, 15, 10, 26]]);
    const expected = [[1.893, 0.334, 0.515], [1.857, 0.327, 0.637],
    [1.857, 0.327, 0.637], [1.813, 0.320, 0.756],
    [1.813, 0.320, 0.756], [1.761, 0.311, 0.872]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a meridional segment, with multiple intermediate points, downwards', () => {
    const merged = service.createObject3D(layer, [[10, 26, 10, 15]]);
    const expected = [[1.761, 0.311, 0.872], [1.813, 0.320, 0.756],
    [1.813, 0.320, 0.756], [1.857, 0.327, 0.637],
    [1.857, 0.327, 0.637], [1.893, 0.334, 0.515]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return geometry without intermediate points if the segment is not parallel or meridional', () => {
    const merged = service.createObject3D(layer, [[10, 25, 32, 47]]);
    const expected = [[1.776, 0.313, 0.841], [1.151, 0.719, 1.455]];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return empty geometry if the segment is empty at initial meridian', () => {
    const merged = service.createObject3D(layer, [[360, 15, 0, 15]]);
    const expected = [];
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

});
