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
    code: SolarSystem.CODE,
    label: 'Solar system',
    loadFromUrl: false,
    objects: []
  };
  const allBodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

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

  it('objects, bodies and trajactories getters should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.objects.length).toEqual(18);
    allBodies.forEach(
      (name: string) => {
        const key = name.toLowerCase();
        expect(layer.getCelestialBody(key)).toBeDefined();
        expect(layer.getTrajectory(key)).toBeDefined();
      }
    );
  }));

  it('texts should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.texts.length).toEqual(9);
    const texts = layer.texts.map((rt: RenderableText) => rt.text);
    allBodies.forEach(
      (name: string) => expect(texts).toContain(name)
    );
  }));

  it('searchables should return expected values', fakeAsync(() => {
    const layer = buildLayer();
    expect(layer.searchables.length).toEqual(9);
    const texts = layer.searchables.map((s: Searchable) => s.names[0]);
    allBodies.forEach(
      (name: string) => expect(texts).toContain(name)
    );
  }));

  describe('addText should', () => {

    it('have no effect if the arg is falsy', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.texts.length).toEqual(9);
      layer.addText(undefined);
      expect(layer.texts.length).toEqual(9);
    }));

    it('add an item to texts', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.texts.length).toEqual(9);

      const item = new RenderableText(
        toVector3(0, 0, 0),
        'test',
        new SunMoonLabelsPolicy()
      );
      layer.addText(item);
      expect(layer.texts.length).toEqual(10);
    }));

  });

  describe('addSeachable should', () => {

    it('have no effect if the arg is falsy', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.searchables.length).toEqual(9);
      layer.addSeachable(undefined);
      expect(layer.searchables.length).toEqual(9);
    }));

    it('add an item to searchables', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.searchables.length).toEqual(9);

      const item = {
        type: 'solar-system-body',
        code: 'TEST',
        ra: 0,
        dec: 0,
        names: ['test']
      };
      layer.addSeachable(item);
      expect(layer.searchables.length).toEqual(10);
    }));

  });

  it('material should be assigned to the objects', fakeAsync(() => {
    const layer = buildLayer();
    layer.applyTheme(mockedTheme);

    assertLineMaterialExpected(layer.getTrajectory('sun'), 2, 'rgb(190, 190, 190)');
    assertLineMaterialExpected(layer.getTrajectory('moon'), 3, 'rgb(200, 200, 200)');
    assertTextureMaterialExpected(layer.getCelestialBody('sun'), 32.5);
    assertTextureMaterialExpected(layer.getCelestialBody('moon'), 26);
  }));

  it('style should be assigned to the texts', fakeAsync(() => {
    const layer = buildLayer();
    layer.applyTheme(mockedTheme);
    expect(layer.texts.length).toEqual(9);

    layer.texts.forEach(
      (object: RenderableText) => {
        expect(object).toBeDefined();
        const expectedStyle = mockedTheme.layers[4].names;
        const assignedStyle = object.htmlElement.style;
        expect(assignedStyle.color).toEqual(expectedStyle.color);
        expect(assignedStyle.fontFamily).toEqual(expectedStyle.fontFamily);
        expect(assignedStyle.fontSize).toEqual(expectedStyle.fontSize);
        expect(assignedStyle.fontStyle).toEqual(expectedStyle.fontStyle);
        expect(assignedStyle.fontWeight).toEqual(expectedStyle.fontWeight);
      }
    );
  }));

  describe('addCelestialBody should', () => {

    describe('have no effect', () => {

      it('if name arg is falsy', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addCelestialBody(undefined, new Points())).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      }));

      it('if body arg is falsy', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addCelestialBody('any', undefined)).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      }));

    });

    it('add expected object', fakeAsync(() => {
      const name = 'another-moon';
      const layer = buildLayer();
      expect(layer.objects.length).toEqual(18);

      layer.addCelestialBody(name, new Points());
      expect(layer.objects.length).toEqual(19);
      expect(layer.getCelestialBody(name)).toBeDefined();
    }));

  });

  describe('addTrajectory should', () => {

    describe('have no effect', () => {

      it('if name arg is falsy', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addTrajectory(undefined, new LineSegments())).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      }));

      it('if body arg is falsy', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addTrajectory('any', undefined)).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      }));

    });

    it('add expected object', fakeAsync(() => {
      const name = 'another-moon';
      const layer = buildLayer();
      expect(layer.objects.length).toEqual(18);

      layer.addTrajectory(name, new LineSegments());
      expect(layer.objects.length).toEqual(19);
      expect(layer.getTrajectory(name)).toBeDefined();
    }));

  });

  describe('setTrajectoriesVisible should', () => {

    it('remove all trajectories from the objects, if they were present', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.objects.length).toEqual(18);

      layer.setTrajectoriesVisible(false);
      expect(layer.objects.length).toEqual(9);
    }));

    it('add all trajectories to the objects, if they were not present', fakeAsync(() => {
      const layer = buildLayer();
      expect(layer.objects.length).toEqual(18);
      layer.setTrajectoriesVisible(false);
      expect(layer.objects.length).toEqual(9);

      layer.setTrajectoriesVisible(true);
      expect(layer.objects.length).toEqual(18);
    }));

    describe('have no effect', () => {

      it('if the trajectories were already removed', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        layer.setTrajectoriesVisible(false);
        expect(layer.objects.length).toEqual(9);

        layer.setTrajectoriesVisible(false);
        expect(layer.objects.length).toEqual(9);
      }));

      it('if the trajectories were already shown', fakeAsync(() => {
        const layer = buildLayer();
        expect(layer.objects.length).toEqual(18);
        layer.setTrajectoriesVisible(true);
        expect(layer.objects.length).toEqual(18);;
      }));

    });

  });

});
