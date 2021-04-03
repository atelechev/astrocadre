import { Color, LineBasicMaterial, LineSegments } from 'three';
import { ConstellationLines } from '#core/models/layers/constellation-lines';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { TestContext } from '#core/test-utils/test-context.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';

describe('ConstellationLines', () => {

  let ctx: TestContext;
  let layer: ConstellationLines;
  const code = 'constellation-lines';

  beforeEach(() => {
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
    layer = new ConstellationLines(model, lines);
    ctx.themeService.theme = mockedTheme;
  });

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
    layer.applyTheme(mockedTheme);
    const objects = layer.objects[0] as LineSegments;
    const assignedMaterial = objects.material as LineBasicMaterial;
    expect(assignedMaterial).toBeDefined();
    expect(assignedMaterial.color).toEqual(new Color(mockedTheme.constellation.lines.line.common));
  });

});
