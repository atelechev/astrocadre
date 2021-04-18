import {
  Color,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments
  } from 'three';
import { buildAndAssignMaterial, buildLineMaterial, buildPointMaterial } from '#core/utils/material-utils';


describe('material-utils', () => {

  describe('buildLineMaterial should return', () => {

    it('an invisible basic material if the arg is falsy', () => {
      const material = buildLineMaterial(undefined);
      expect(material).toBeDefined();
      expect(material.visible).toBeFalse();
      expect(material.type).toEqual('LineBasicMaterial');
    });

    it('expected non-dashed material', () => {
      const style = {
        color: 'red',
        width: 10
      };
      const material = buildLineMaterial(style);
      expect(material).toBeDefined();
      expect(material.visible).toBeTrue();
      expect(material.type).toEqual('LineBasicMaterial');
      const lineMaterial = material as LineBasicMaterial;
      expect(lineMaterial.color).toEqual(new Color(style.color));
      expect(lineMaterial.linewidth).toEqual(style.width);
    });

    it('expected dashed material', () => {
      const style = {
        color: 'red',
        width: 2,
        dash: 10,
        gap: 5
      };
      const material = buildLineMaterial(style);
      expect(material).toBeDefined();
      expect(material.visible).toBeTrue();
      expect(material.type).toEqual('LineDashedMaterial');
      const lineMaterial = material as LineDashedMaterial;
      expect(lineMaterial.color).toEqual(new Color(style.color));
      expect(lineMaterial.linewidth).toEqual(style.width);
      expect(lineMaterial.dashSize).toEqual(style.dash);
      expect(lineMaterial.gapSize).toEqual(style.gap);
    });

  });

  describe('buildPointMaterial should return', () => {

    it('an invisible material if the image arg is falsy', () => {
      const material = buildPointMaterial(undefined, 1);
      expect(material).toBeDefined();
      expect(material.visible).toBeFalse();
      expect(material.type).toEqual('PointsMaterial');
    });

    it('material with default size if the dotSize arg is falsy', () => {
      const material = buildPointMaterial('assets/textures/star_white.png', undefined);
      expect(material).toBeDefined();
      expect(material.visible).toBeTrue();
      expect(material.size).toEqual(1);
    });

    it('expected textured material', () => {
      const material = buildPointMaterial('assets/textures/star_red.png', 5);
      expect(material).toBeDefined();
      expect(material.visible).toBeTrue();
      expect(material.size).toEqual(5);
      expect(material.opacity).toEqual(0.95);
    });

  });

  describe('buildAndAssignMaterial should', () => {

    it('have no effect if builder arg is falsy', () => {
      const object = new LineSegments();
      const initial = object.material;
      buildAndAssignMaterial(undefined, object);
      expect(object.material).toEqual(initial);
    });

    it('have no effect if object arg is falsy', () => {
      buildAndAssignMaterial(() => new LineBasicMaterial(), undefined);
    });

    it('build the expected material', () => {
      const object = new LineSegments();
      const initial = object.material;
      buildAndAssignMaterial(() => new LineBasicMaterial({ linewidth: 10 }), object);
      expect(object.material).not.toEqual(initial);
    });

  });

});
