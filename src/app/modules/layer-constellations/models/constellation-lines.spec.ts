import { TestBed } from '@angular/core/testing';
import { Color, LineBasicMaterial, LineSegments } from 'three';
import { ConstellationLines } from '#layer-constellations/models/constellation-lines';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';

describe('ConstellationLines', () => {

  const code = 'constellation-lines';
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
  let layer: ConstellationLines;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerConstellationsModule],
      providers: [
        SearchService,
        ThemeService
      ]
    });
    const factory = TestBed.inject(LayerConstellationsModule).getLayerFactory(model);
    layer = factory.buildRenderableLayer() as ConstellationLines;
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
    expect(assignedMaterial.color).toEqual(new Color(mockedTheme.constellation.lines.color));
  });

});
