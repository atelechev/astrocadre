import { fakeAsync } from '@angular/core/testing';
import { ConstellationLines } from 'src/app/modules2/core/models/layers/constellation-lines';
import { AxialCurvesFactory } from 'src/app/modules2/core/models/layers/factories/axial-curves-factory';
import { assertMaterialExpected } from 'src/app/modules2/core/test-utils/assertions-material.spec';
import { TestContext } from 'src/app/modules2/core/test-utils/test-context.spec';
import { LineSegments } from 'three';

describe('ConstellationLines', () => {

  let ctx: TestContext;
  let layer: ConstellationLines;
  const code = 'constellation-lines';

  beforeEach(fakeAsync(() => {
    ctx = new TestContext().configure();
    const model = {
      code,
      label: 'Lines',
      loadFromUrl: true,
      objects: [
        [72.46, 6.95, 72.65, 8.9],
        [72.8, 5.6, 72.46, 6.95],
        [73.56, 2.45, 72.8, 5.6],
        [74.64, 1.72, 73.56, 2.45]
      ]
    };
    const lines = new AxialCurvesFactory().createObject3D(model.code, model.objects);
    layer = new ConstellationLines(
      model,
      ctx.materialsService,
      ctx.eventsService,
      lines
    );
  }));

  it('texts should return an empty array', () => {
    const texts = layer.texts;
    expect(texts).toEqual([]);
  });

  it('searchables should return an empty array', () => {
    const searchables = layer.searchables;
    expect(searchables).toEqual([]);
  });

  it('objects should return expected data', () => {
    const objects = layer.objects;
    expect(objects).toBeDefined();
    expect(objects.length).toEqual(1);
  });

  it('material should be assigned to the objects', () => {
    const objects = layer.objects[0] as LineSegments;
    assertMaterialExpected(ctx, objects, code);
  });

});
