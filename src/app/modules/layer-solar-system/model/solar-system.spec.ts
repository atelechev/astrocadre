import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  Color,
  LineBasicMaterial,
  LineSegments,
  Points,
  PointsMaterial
  } from 'three';
import { ThemeService } from '#core/services/theme.service';
import { mockedTheme } from '#core/test-utils/mocked-theme.spec';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { SolarSystem } from '#layer-solar-system/model/solar-system';
import { SolarSystemLayerFactoryService } from '#layer-solar-system/services/factories/solar-system-layer-factory.service';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { toVector3 } from '#core/utils/vector-utils';
import { SunMoonLabelsPolicy } from '#layer-solar-system/model/layers/sun-moon-labels-policy';


describe('SolarSystem', () => {

  const model = {
    code: 'solar-system',
    label: 'Solar system',
    loadFromUrl: false,
    objects: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule],
      providers: [
        ThemeService
      ]
    });
    TestBed.inject(ThemeService).theme = mockedTheme;
  });

  const buildLayer = (): SolarSystem => {
    const layer = TestBed.inject(SolarSystemLayerFactoryService).buildRenderableLayer(model);
    tick();
    return layer;
  };

  const assertLineMaterialExpected = (object: LineSegments, expectedWidth: number, expectedColor: string): void => {
    expect(object).toBeDefined();
    const foundMaterial = object.material as LineBasicMaterial;
    expect(foundMaterial.linewidth).toEqual(expectedWidth);
    expect(foundMaterial.color).toEqual(new Color(expectedColor));
  };

  const assertTextureMaterialExpected = (object: Points, expectedSize: number): void => {
    expect(object).toBeDefined();
    const foundMaterial = object.material as PointsMaterial;
    expect(foundMaterial.size).toEqual(expectedSize);
  };

  it('objects and each object getter should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.objects.length).toEqual(4);
    expect(layer.sun).toBeDefined();
    expect(layer.moon).toBeDefined();
    expect(layer.ecliptic).toBeDefined();
    expect(layer.moonPath).toBeDefined();
  }));

  it('texts should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.texts.length).toEqual(2);
    const texts = layer.texts.map((rt: RenderableText) => rt.text);
    expect(texts).toContain('Sun');
    expect(texts).toContain('Moon');
  }));

  it('searchables should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.searchables.length).toEqual(2);
    const texts = layer.searchables.map((s: Searchable) => s.names[0]);
    expect(texts).toContain('Sun');
    expect(texts).toContain('Moon');
  }));

  describe('addText should', () => {

    it('have no effect if the arg is falsy', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.texts.length).toEqual(2);
      layer.addText(undefined);
      expect(layer.texts.length).toEqual(2);
    }));

    it('add an item to texts', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.texts.length).toEqual(2);

      const item = new RenderableText(
        toVector3(0, 0, 0),
        'test',
        new SunMoonLabelsPolicy()
      );
      layer.addText(item);
      expect(layer.texts.length).toEqual(3);
    }));

  });

  describe('addSeachable should', () => {

    it('have no effect if the arg is falsy', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.searchables.length).toEqual(2);
      layer.addSeachable(undefined);
      expect(layer.searchables.length).toEqual(2);
    }));

    it('add an item to searchables', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.searchables.length).toEqual(2);

      const item = {
        type: 'solar-system-body',
        code: 'TEST',
        ra: 0,
        dec: 0,
        names: ['test']
      };
      layer.addSeachable(item);
      expect(layer.searchables.length).toEqual(3);
    }));

  });

  it('material should be assigned to the objects', fakeAsync(() => {
    const layer = buildLayer();
    layer.applyTheme(mockedTheme);

    assertLineMaterialExpected(layer.objects[0] as LineSegments, 2, 'rgb(190, 190, 190)');
    assertLineMaterialExpected(layer.objects[1] as LineSegments, 3, 'rgb(200, 200, 200)');
    assertTextureMaterialExpected(layer.objects[2] as Points, 32.5);
    assertTextureMaterialExpected(layer.objects[3] as Points, 26);
  }));

  it('style should be assigned to the texts', fakeAsync(() => {
    const layer = buildLayer();
    layer.applyTheme(mockedTheme);
    expect(layer.texts.length).toEqual(2);

    layer.texts.forEach(
      (object: RenderableText) => {
        expect(object).toBeDefined();
        const expectedStyle = mockedTheme.solarSystem.names;
        const assignedStyle = object.htmlElement.style;
        expect(assignedStyle.color).toEqual(expectedStyle.color);
        expect(assignedStyle.fontFamily).toEqual(expectedStyle.fontFamily);
        expect(assignedStyle.fontSize).toEqual(expectedStyle.fontSize);
        expect(assignedStyle.fontStyle).toEqual(expectedStyle.fontStyle);
        expect(assignedStyle.fontWeight).toEqual(expectedStyle.fontWeight);
      }
    );
  }));

});
