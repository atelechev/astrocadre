import { fakeAsync, TestBed } from '@angular/core/testing';
import { Color, LineBasicMaterial, LineSegments } from 'three';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LineStyle } from '#core/models/theme/line-style';
import { SearchService } from '#core/services/search.service';
import { ThemeService } from '#core/services/theme.service';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { SkyGridProvidersService } from '#layer-sky-grid/services/sky-grid-providers.service';


describe('SkyGrid', () => {

  let layer: SkyGrid;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerSkyGridModule],
      providers: [
        SearchService,
        ThemeService
      ]
    });
    TestBed.inject(ThemeService).theme = mockedTheme;
    TestBed.inject(SkyGridProvidersService).getRenderableLayer()
      .then(
        (renderable: SkyGrid) => layer = renderable
      );
  }));

  const assertColorMaterialExpected = (object: LineSegments, line: LineStyle): void => {
    const assignedMaterial = object.material as LineBasicMaterial;
    expect(assignedMaterial).toBeDefined();
    expect(assignedMaterial.color).toEqual(new Color(line.color));
  };

  const assertCommonLineMaterialExpected = (object: LineSegments): void => {
    assertColorMaterialExpected(object, mockedTheme.layers[0].normal);
  };

  const assertReferenceLineMaterialExpected = (object: LineSegments): void => {
    assertColorMaterialExpected(object, mockedTheme.layers[0].reference);
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
