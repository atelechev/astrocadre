import { TestBed } from '@angular/core/testing';
import { LineBasicMaterial, LineSegments, Object3D } from 'three';
import { SkyGrid } from '#core/models/layers/sky-grid';
import { Materials } from '#core/models/materials';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

const model = {
  code: 'sky-grid',
  label: 'Coordinates grid',
  loadFromUrl: false,
  description: 'Celestial coordinates grid in degrees',
  objects: []
};

describe('SkyGrid', () => {

  let ctx: TestContext;
  let layer: SkyGrid;

  beforeEach(() => {
    ctx = new TestContext().configure();
    ctx.layerService.rootLayer = mockedLayers;
    layer = TestBed.inject(LayersFactoryService).buildRenderableLayer(model) as SkyGrid;
    ctx.themeService.theme = mockedTheme;
  });

  const assertMaterialExpected = (object: LineSegments, expectedMaterialKey: string): void => {
    const assignedMaterial = object.material as LineBasicMaterial;
    expect(assignedMaterial).toBeDefined();
    const expectedMaterial = ctx.materialsService
      .getMaterialsForLayer('sky-grid')
      .get(expectedMaterialKey) as LineBasicMaterial;
    expect(expectedMaterial).toBeDefined();
    expect(assignedMaterial.color).toEqual(expectedMaterial.color);
  };

  it('objects should return expected value', () => {
    expect(layer.objects.length).toEqual(4);
  });

  it('texts should be empty', () => {
    expect(layer.texts.length).toEqual(0);
  });

  it('searchables should be empty', () => {
    expect(layer.searchables.length).toEqual(0);
  });

  it('material should be assigned to the objects', () => {
    const getObject = (i: number): LineSegments => layer.objects[i] as LineSegments;
    assertMaterialExpected(getObject(0), Materials.LINE_COMMON);
    assertMaterialExpected(getObject(1), Materials.LINE_COMMON);
    assertMaterialExpected(getObject(2), Materials.LINE_REFERENCE);
    assertMaterialExpected(getObject(3), Materials.LINE_REFERENCE);
  });

});
