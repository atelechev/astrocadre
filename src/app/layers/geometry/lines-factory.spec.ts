import { TestBed } from '@angular/core/testing';
import { BufferGeometry } from 'three';
import { assertGeometryExpected, assertSegmentsArgMustBeDefined, assertSegmentsArgMustNotBeEmpty } from '#layers/geometry/object3d-factory.spec';
import { LinesFactory } from '#layers/geometry/lines-factory';
import { Layers } from '#core/layers';

describe('LinesFactory', () => {

  const layer = Layers.CONSTELLATION_LINES;

  let service: LinesFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LinesFactory] });
    service = TestBed.get(LinesFactory);
  });

  it('#createObject3D should throw expected error if segments arg is undefined', () => {
    assertSegmentsArgMustBeDefined(() => service.createObject3D(layer, undefined));
  });

  it('#createObject3D should throw expected error if segments arg is empty', () => {
    assertSegmentsArgMustNotBeEmpty(() => service.createObject3D(layer, []));
  });

  it('#toObject3D should return expected object for multiple segments', () => {
    const expected = [[0.471, 0.699, -1.792], [0.407, 0.820, -1.756],
    [0.478, 0.818, -1.738], [0.471, 0.699, -1.792]];
    const merged = service.createObject3D(layer, [[56.05, -64.8, 63.6, -62.47], [59.69, -61.4, 56.05, -64.8]]);
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

  it('#toObject3D should return expected object for a single segment', () => {
    const expected = [[0.471, 0.699, -1.792], [0.407, 0.820, -1.756]];
    const merged = service.createObject3D(layer, [[56.05, -64.8, 63.6, -62.47]]);
    assertGeometryExpected(merged.geometry as BufferGeometry, expected);
  });

});
