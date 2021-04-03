import { Color, LineBasicMaterial, LineSegments } from 'three';
import { ConstellationBoundaries } from '#core/models/layers/constellation-boundaries';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { TestContext } from '#core/test-utils/test-context.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';


describe('ConstellationBoundaries', () => {

  let ctx: TestContext;
  let layer: ConstellationBoundaries;
  const code = 'constellation-boundaries';

  beforeEach(() => {
    ctx = new TestContext().configure();
    const model = {
      code,
      label: 'Boundaries',
      loadFromUrl: true,
      objects: [
        [177.5, -24.5, 162.5, -24.5],
        [170.0, 73.5, 170.0, 66.5],
        [165.0, 25.5, 161.25, 25.5]
      ]
    };
    const lines = new AxialCurvesFactory().createObject3D(model.code, model.objects);
    layer = new ConstellationBoundaries(model, lines);
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
    expect(assignedMaterial.color).toEqual(new Color(mockedTheme.constellation.boundaries.color));
  });

});
