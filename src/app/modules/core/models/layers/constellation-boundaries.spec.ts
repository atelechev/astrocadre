import { TestBed } from '@angular/core/testing';
import { Color, LineBasicMaterial, LineSegments } from 'three';
import { ConstellationBoundaries } from '#core/models/layers/constellation-boundaries';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';


describe('ConstellationBoundaries', () => {

  let layer: ConstellationBoundaries;
  const code = 'constellation-boundaries';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayersFactoryService,
        SearchService,
        ThemeService
      ]
    });
    layer = TestBed.inject(LayersFactoryService).buildRenderableLayer(model) as ConstellationBoundaries;
    TestBed.inject(ThemeService).theme = mockedTheme;
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
