import { TestBed } from '@angular/core/testing';
import { Color, LineBasicMaterial, LineSegments } from 'three';
import { SkyGrid } from '#core/models/layers/sky-grid';
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

  const assertColorMaterialExpected = (object: LineSegments, color: string): void => {
    const assignedMaterial = object.material as LineBasicMaterial;
    expect(assignedMaterial).toBeDefined();
    expect(assignedMaterial.color).toEqual(new Color(color));
  };

  const assertCommonLineMaterialExpected = (object: LineSegments): void => {
    assertColorMaterialExpected(object, mockedTheme.skyGrid.line.common);
  };

  const assertReferenceLineMaterialExpected = (object: LineSegments): void => {
    assertColorMaterialExpected(object, mockedTheme.skyGrid.line.reference);
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
    layer.applyTheme(mockedTheme);
    const getObject = (i: number): LineSegments => layer.objects[i] as LineSegments;
    assertCommonLineMaterialExpected(getObject(0));
    assertCommonLineMaterialExpected(getObject(1));
    assertReferenceLineMaterialExpected(getObject(2));
    assertReferenceLineMaterialExpected(getObject(3));
  });

});
