import { Vector3 } from 'three';
import { toVector3 } from '#core/utils/vector-utils';

describe('vector-utils', () => {

  const closeToPrecision = 3;

  const assertVectorExected = (checked: Vector3, xExp: number, yExp: number, zExp: number) => {
    expect(checked).toBeDefined();
    expect(checked.x).toBeCloseTo(xExp, closeToPrecision);
    expect(checked.y).toBeCloseTo(yExp, closeToPrecision);
    expect(checked.z).toBeCloseTo(zExp, closeToPrecision);
  };

  describe('toVector3 should return expected Vector3', () => {

    describe('for EQUATOR with 45° step', () => {

      it('for (0, 0, 1)', () => {
        assertVectorExected(toVector3(0, 0, 1), 1, 0, 0);
      });

      it('for (45, 0, 1)', () => {
        assertVectorExected(toVector3(45, 0, 1), 0.707, 0.707, 0);
      });

      it('for (90, 0, 1)', () => {
        assertVectorExected(toVector3(90, 0, 1), 0, 1, 0);
      });

      it('for (135, 0, 1)', () => {
        assertVectorExected(toVector3(135, 0, 1), -0.707, 0.707, 0);
      });

      it('for (180, 0, 1)', () => {
        assertVectorExected(toVector3(180, 0, 1), -1, 0, 0);
      });

      it('for (225, 0, 1)', () => {
        assertVectorExected(toVector3(225, 0, 1), -0.707, -0.707, 0);
      });

      it('for (270, 0, 1)', () => {
        assertVectorExected(toVector3(270, 0, 1), 0, -1, 0);
      });

      it('for (315, 0, 1)', () => {
        assertVectorExected(toVector3(315, 0, 1), 0.707, -0.707, 0);
      });

      it('for (360, 0, 1)', () => {
        assertVectorExected(toVector3(360, 0, 1), 1, 0, 0);
      });

    });

    describe('for 0-meridian with 45° step', () => {

      it('for (0, 0, 1)', () => {
        assertVectorExected(toVector3(0, 0, 1), 1, 0, 0);
      });

      it('for (0, 45, 1)', () => {
        assertVectorExected(toVector3(0, 45, 1), 0.707, 0, 0.707);
      });

      it('for (0, 90, 1)', () => {
        assertVectorExected(toVector3(0, 90, 1), 0, 0, 1);
      });

      it('for (180, 90, 1)', () => {
        assertVectorExected(toVector3(180, 90, 1), 0, 0, 1);
      });

      it('for (180, 45, 1)', () => {
        assertVectorExected(toVector3(180, 45, 1), -0.707, 0, 0.707);
      });

      it('for (180, 0, 1)', () => {
        assertVectorExected(toVector3(180, 0, 1), -1, 0, 0);
      });

      it('for (180, -45, 1)', () => {
        assertVectorExected(toVector3(180, -45, 1), -0.707, 0, -0.707);
      });

      it('for (180, -90, 1)', () => {
        assertVectorExected(toVector3(180, -90, 1), 0, 0, -1);
      });

      it('for (0, -90, 1)', () => {
        assertVectorExected(toVector3(0, -90, 1), 0, 0, -1);
      });

      it('for (0, -45, 1)', () => {
        assertVectorExected(toVector3(0, -45, 1), 0.707, 0, -0.707);
      });

    });

    describe('for WE-meridian with 45° step', () => {

      it('for (90, 0, 1)', () => {
        assertVectorExected(toVector3(90, 0, 1), 0, 1, 0);
      });

      it('for (90, 45, 1)', () => {
        assertVectorExected(toVector3(90, 45, 1), 0, 0.707, 0.707);
      });

      it('for (90, 90, 1)', () => {
        assertVectorExected(toVector3(90, 90, 1), 0, 0, 1);
      });

      it('for (270, 90, 1)', () => {
        assertVectorExected(toVector3(270, 90, 1), 0, 0, 1);
      });

      it('for (270, 45, 1)', () => {
        assertVectorExected(toVector3(270, 45, 1), 0, -0.707, 0.707);
      });

      it('for (270, 0, 1)', () => {
        assertVectorExected(toVector3(270, 0, 1), 0, -1, 0);
      });

      it('for (270, -45, 1)', () => {
        assertVectorExected(toVector3(270, -45, 1), 0, -0.707, -0.707);
      });

      it('for (270, -90, 1)', () => {
        assertVectorExected(toVector3(270, -90, 1), 0, 0, -1);
      });

      it('for (90, -90, 1)', () => {
        assertVectorExected(toVector3(90, -90, 1), 0, 0, -1);
      });

      it('for (90, -45, 1)', () => {
        assertVectorExected(toVector3(90, -45, 1), 0, 0.707, -0.707);
      });

    });

  });

});
