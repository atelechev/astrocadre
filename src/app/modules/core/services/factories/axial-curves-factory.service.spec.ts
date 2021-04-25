import { TestBed } from '@angular/core/testing';
import { BufferGeometry } from 'three';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { assertGeometryExpected } from '#core/test-utils/assertions-geometry.spec';
import { CoreModule } from '#core/core.module';
import { Constellations } from '#layer-constellations/models/constellations';

describe('AxialCurvesFactoryService', () => {

  const layerCode = Constellations.CODE;

  let factory: AxialCurvesFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });
    factory = TestBed.inject(AxialCurvesFactoryService);
  });

  it('createObject3D should throw expected error if segments arg is falsy', () => {
    expect(() => factory.createObject3D(layerCode, undefined)).toThrowError('segments arg must be defined');
  });

  describe('toObject3D should return', () => {

    describe('expected object', () => {

      describe('or a parallel segment', () => {

        it('without intermediate points, rightwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 12, 15]]);
          const expected = [[1.903, 0.335, 0.518], [1.890, 0.402, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('without intermediate points, leftwards', () => {
          const merged = factory.createObject3D(layerCode, [[12, 15, 10, 15]]);
          const expected = [[1.890, 0.402, 0.518], [1.903, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with one intermediate point, rightwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 16, 15]]);
          const expected = [[1.902, 0.335, 0.518], [1.882, 0.435, 0.518],
          [1.882, 0.435, 0.518], [1.857, 0.532, 0.518],];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with one intermediate point, leftwards', () => {
          const merged = factory.createObject3D(layerCode, [[16, 15, 10, 15]]);
          const expected = [[1.857, 0.532, 0.518], [1.882, 0.435, 0.518],
          [1.882, 0.435, 0.518], [1.902, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with multiple intermediate points, rightwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 21, 15]]);
          const expected = [[1.903, 0.335, 0.518], [1.877, 0.456, 0.518],
          [1.877, 0.456, 0.518], [1.844, 0.576, 0.518],
          [1.844, 0.576, 0.518], [1.804, 0.692, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with multiple intermediate points, leftwards', () => {
          const merged = factory.createObject3D(layerCode, [[21, 15, 10, 15]]);
          const expected = [[1.804, 0.692, 0.518], [1.844, 0.576, 0.518],
          [1.844, 0.576, 0.518], [1.877, 0.456, 0.518],
          [1.877, 0.456, 0.518], [1.902, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

      });

      describe('for a meridional segment', () => {

        it('without intermediate points, upwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 10, 17]]);
          const expected = [[1.903, 0.335, 0.518], [1.884, 0.332, 0.585]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('without intermediate points, downwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 17, 10, 15]]);
          const expected = [[1.884, 0.332, 0.585], [1.902, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with one intermediate point, upwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 10, 21]]);
          const expected = [[1.903, 0.335, 0.518], [1.873, 0.330, 0.618],
          [1.873, 0.330, 0.618], [1.839, 0.324, 0.717]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with one intermediate point, downwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 21, 10, 15]]);
          const expected = [[1.839, 0.324, 0.717], [1.873, 0.330, 0.618],
          [1.873, 0.330, 0.618], [1.903, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with multiple intermediate points, upwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 15, 10, 26]]);
          const expected = [[1.903, 0.335, 0.518], [1.866, 0.329, 0.640],
          [1.866, 0.329, 0.640], [1.822, 0.321, 0.760],
          [1.822, 0.321, 0.760], [1.770, 0.312, 0.877]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

        it('with multiple intermediate points, downwards', () => {
          const merged = factory.createObject3D(layerCode, [[10, 26, 10, 15]]);
          const expected = [[1.770, 0.312, 0.877], [1.822, 0.321, 0.760],
          [1.822, 0.321, 0.760], [1.866, 0.329, 0.640],
          [1.866, 0.329, 0.640], [1.903, 0.335, 0.518]];
          assertGeometryExpected(merged.geometry as BufferGeometry, expected);
        });

      });

    });

    it('geometry without intermediate points if the segment is not parallel or meridional', () => {
      const merged = factory.createObject3D(layerCode, [[10, 25, 32, 47]]);
      const expected = [[1.785, 0.315, 0.845], [1.157, 0.723, 1.463]];
      assertGeometryExpected(merged.geometry as BufferGeometry, expected);
    });

    it('empty geometry if the segment is empty at initial meridian', () => {
      const merged = factory.createObject3D(layerCode, [[360, 15, 0, 15]]);
      const expected = [];
      assertGeometryExpected(merged.geometry as BufferGeometry, expected);
    });

  });

});
