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
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { toVector3 } from '#core/utils/vector-utils';
import { SunMoonLabelsPolicy } from '#layer-solar-system/model/layers/sun-moon-labels-policy';
import { SolarSystemProvidersService } from '#layer-solar-system/services/solar-system-providers.service';


describe('SolarSystem', () => {

  const allBodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  let layer: SolarSystem;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayerSolarSystemModule],
      providers: [
        ThemeService
      ]
    });
    TestBed.inject(ThemeService).theme = mockedTheme;
    TestBed.inject(SolarSystemProvidersService).getRenderableLayer()
      .then(
        (renderable: SolarSystem) => layer = renderable
      );
    tick();
  }));

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

  it('objects, bodies and trajactories getters should return expected values', () => {
    expect(layer.objects.length).toEqual(18);
    allBodies.forEach(
      (name: string) => {
        const key = name.toLowerCase();
        expect(layer.getCelestialBody(key)).toBeDefined();
        expect(layer.getTrajectory(key)).toBeDefined();
      }
    );
  });

  it('texts should return expected values', () => {
    expect(layer.texts.length).toEqual(9);
    const texts = layer.texts.map((rt: RenderableText) => rt.text);
    allBodies.forEach(
      (name: string) => expect(texts).toContain(name)
    );
  });

  it('searchables should return expected values', () => {
    expect(layer.searchables.length).toEqual(9);
    const texts = layer.searchables.map((s: Searchable) => s.names[0]);
    allBodies.forEach(
      (name: string) => expect(texts).toContain(name)
    );
  });

  describe('addText should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(layer.texts.length).toEqual(9);
      layer.addText(undefined);
      expect(layer.texts.length).toEqual(9);
    });

    it('add an item to texts', () => {
      expect(layer.texts.length).toEqual(9);

      const item = new RenderableText(
        toVector3(0, 0, 0),
        'test',
        new SunMoonLabelsPolicy()
      );
      layer.addText(item);
      expect(layer.texts.length).toEqual(10);
    });

  });

  describe('addSeachable should', () => {

    it('have no effect if the arg is falsy', () => {
      expect(layer.searchables.length).toEqual(9);
      layer.addSeachable(undefined);
      expect(layer.searchables.length).toEqual(9);
    });

    it('add an item to searchables', () => {
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
    });

  });

  it('material should be assigned to the objects', () => {
    layer.applyTheme(mockedTheme);

    assertLineMaterialExpected(layer.getTrajectory('sun'), 2, 'rgb(190, 190, 190)');
    assertLineMaterialExpected(layer.getTrajectory('moon'), 3, 'rgb(200, 200, 200)');
    assertTextureMaterialExpected(layer.getCelestialBody('sun'), 32.5);
    assertTextureMaterialExpected(layer.getCelestialBody('moon'), 26);
  });

  it('style should be assigned to the texts', () => {
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
  });

  describe('addCelestialBody should', () => {

    describe('have no effect', () => {

      it('if name arg is falsy', () => {
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addCelestialBody(undefined, new Points())).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      });

      it('if body arg is falsy', () => {
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addCelestialBody('any', undefined)).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      });

    });

    it('add expected object', () => {
      const name = 'another-moon';
      expect(layer.objects.length).toEqual(18);

      layer.addCelestialBody(name, new Points());
      expect(layer.objects.length).toEqual(19);
      expect(layer.getCelestialBody(name)).toBeDefined();
    });

  });

  describe('addTrajectory should', () => {

    describe('have no effect', () => {

      it('if name arg is falsy', () => {
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addTrajectory(undefined, new LineSegments())).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      });

      it('if body arg is falsy', () => {
        expect(layer.objects.length).toEqual(18);
        expect(() => layer.addTrajectory('any', undefined)).not.toThrowError();
        expect(layer.objects.length).toEqual(18);
      });

    });

    it('add expected object', () => {
      const name = 'another-moon';
      expect(layer.objects.length).toEqual(18);

      layer.addTrajectory(name, new LineSegments());
      expect(layer.objects.length).toEqual(19);
      expect(layer.getTrajectory(name)).toBeDefined();
    });

  });

  describe('setTrajectoriesVisible should', () => {

    it('remove all trajectories from the objects, if they were present', () => {
      expect(layer.objects.length).toEqual(18);

      layer.setTrajectoriesVisible(false);
      expect(layer.objects.length).toEqual(9);
    });

    it('add all trajectories to the objects, if they were not present', () => {
      expect(layer.objects.length).toEqual(18);
      layer.setTrajectoriesVisible(false);
      expect(layer.objects.length).toEqual(9);

      layer.setTrajectoriesVisible(true);
      expect(layer.objects.length).toEqual(18);
    });

    describe('have no effect', () => {

      it('if the trajectories were already removed', () => {
        expect(layer.objects.length).toEqual(18);
        layer.setTrajectoriesVisible(false);
        expect(layer.objects.length).toEqual(9);

        layer.setTrajectoriesVisible(false);
        expect(layer.objects.length).toEqual(9);
      });

      it('if the trajectories were already shown', () => {
        expect(layer.objects.length).toEqual(18);
        layer.setTrajectoriesVisible(true);
        expect(layer.objects.length).toEqual(18);;
      });

    });

  });

});
