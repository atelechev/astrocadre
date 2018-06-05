import { toVector3, toRadians } from './vector-utils';
import { Vector3 } from 'three';

describe('vector-utils', () => {

  const closeToPrecision = 3;

  const assertVectorExected = (checked: Vector3, xExp: number, yExp: number, zExp: number) => {
    expect(checked).toBeDefined();
    expect(checked.x).toBeCloseTo(xExp, closeToPrecision);
    expect(checked.y).toBeCloseTo(yExp, closeToPrecision);
    expect(checked.z).toBeCloseTo(zExp, closeToPrecision);
  };

  /* EQUATOR with 45° step */
  it('#toVector3 should return expected Vector3 for (0, 0, 1)', () => {
    assertVectorExected(toVector3(0, 0, 1), 1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (45, 0, 1)', () => {
    assertVectorExected(toVector3(45, 0, 1), 0.707, 0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (90, 0, 1)', () => {
    assertVectorExected(toVector3(90, 0, 1), 0, 1, 0);
  });

  it('#toVector3 should return expected Vector3 for (135, 0, 1)', () => {
    assertVectorExected(toVector3(135, 0, 1), -0.707, 0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (180, 0, 1)', () => {
    assertVectorExected(toVector3(180, 0, 1), -1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (225, 0, 1)', () => {
    assertVectorExected(toVector3(225, 0, 1), -0.707, -0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (270, 0, 1)', () => {
    assertVectorExected(toVector3(270, 0, 1), 0, -1, 0);
  });

  it('#toVector3 should return expected Vector3 for (315, 0, 1)', () => {
    assertVectorExected(toVector3(315, 0, 1), 0.707, -0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (360, 0, 1)', () => {
    assertVectorExected(toVector3(360, 0, 1), 1, 0, 0);
  });

  /* 0-meridian with 45° step */
  it('#toVector3 should return expected Vector3 for (0, 0, 1)', () => {
    assertVectorExected(toVector3(0, 0, 1), 1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (0, 45, 1)', () => {
    assertVectorExected(toVector3(0, 45, 1), 0.707, 0, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (0, 90, 1)', () => {
    assertVectorExected(toVector3(0, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (180, 90, 1)', () => {
    assertVectorExected(toVector3(180, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (180, 45, 1)', () => {
    assertVectorExected(toVector3(180, 45, 1), -0.707, 0, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (180, 0, 1)', () => {
    assertVectorExected(toVector3(180, 0, 1), -1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (180, -45, 1)', () => {
    assertVectorExected(toVector3(180, -45, 1), -0.707, 0, -0.707);
  });

  it('#toVector3 should return expected Vector3 for (180, -90, 1)', () => {
    assertVectorExected(toVector3(180, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (0, -90, 1)', () => {
    assertVectorExected(toVector3(0, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (0, -45, 1)', () => {
    assertVectorExected(toVector3(0, -45, 1), 0.707, 0, -0.707);
  });

  /* WE-meridian with 45° step */

  it('#toVector3 should return expected Vector3 for (90, 0, 1)', () => {
    assertVectorExected(toVector3(90, 0, 1), 0, 1, 0);
  });

  it('#toVector3 should return expected Vector3 for (90, 45, 1)', () => {
    assertVectorExected(toVector3(90, 45, 1), 0, 0.707, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (90, 90, 1)', () => {
    assertVectorExected(toVector3(90, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (270, 90, 1)', () => {
    assertVectorExected(toVector3(270, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (270, 45, 1)', () => {
    assertVectorExected(toVector3(270, 45, 1), 0, -0.707, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (270, 0, 1)', () => {
    assertVectorExected(toVector3(270, 0, 1), 0, -1, 0);
  });

  it('#toVector3 should return expected Vector3 for (270, -45, 1)', () => {
    assertVectorExected(toVector3(270, -45, 1), 0, -0.707, -0.707);
  });

  it('#toVector3 should return expected Vector3 for (270, -90, 1)', () => {
    assertVectorExected(toVector3(270, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (90, -90, 1)', () => {
    assertVectorExected(toVector3(90, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (90, -45, 1)', () => {
    assertVectorExected(toVector3(90, -45, 1), 0, 0.707, -0.707);
  });


  it('#toRadians should convert 0 degrees expected value in radians', () => {
    expect(toRadians(0)).toBe(0);
  });

  it('#toRadians should convert 45 degrees expected value in radians', () => {
    expect(toRadians(45)).toBeCloseTo(Math.PI / 4, 3);
  });

  it('#toRadians should convert 90 degrees expected value in radians', () => {
    expect(toRadians(90)).toBeCloseTo(Math.PI / 2, 3);
  });

  it('#toRadians should convert 180 degrees expected value in radians', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI, 3);
  });

  it('#toRadians should convert 270 degrees expected value in radians', () => {
    expect(toRadians(270)).toBeCloseTo(Math.PI + Math.PI / 2, 3);
  });

  it('#toRadians should convert 360 degrees expected value in radians', () => {
    expect(toRadians(0)).toBe(0);
  });

});
