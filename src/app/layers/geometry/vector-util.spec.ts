import { VectorUtil } from './vector-util';
import { Vector3 } from 'three';

describe('VectorUtil', () => {

  const util = VectorUtil;

  const closeToPrecision = 3;

  const assertVectorExected = (checked: Vector3, xExp: number, yExp: number, zExp: number) => {
    expect(checked).toBeDefined();
    expect(checked.x).toBeCloseTo(xExp, closeToPrecision);
    expect(checked.y).toBeCloseTo(yExp, closeToPrecision);
    expect(checked.z).toBeCloseTo(zExp, closeToPrecision);
  };

  /* EQUATOR with 45° step */
  it('#toVector3 should return expected Vector3 for (0, 0, 1)', () => {
    assertVectorExected(util.toVector3(0, 0, 1), 1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (45, 0, 1)', () => {
    assertVectorExected(util.toVector3(45, 0, 1), 0.707, 0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (90, 0, 1)', () => {
    assertVectorExected(util.toVector3(90, 0, 1), 0, 1, 0);
  });

  it('#toVector3 should return expected Vector3 for (135, 0, 1)', () => {
    assertVectorExected(util.toVector3(135, 0, 1), -0.707, 0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (180, 0, 1)', () => {
    assertVectorExected(util.toVector3(180, 0, 1), -1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (225, 0, 1)', () => {
    assertVectorExected(util.toVector3(225, 0, 1), -0.707, -0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (270, 0, 1)', () => {
    assertVectorExected(util.toVector3(270, 0, 1), 0, -1, 0);
  });

  it('#toVector3 should return expected Vector3 for (315, 0, 1)', () => {
    assertVectorExected(util.toVector3(315, 0, 1), 0.707, -0.707, 0);
  });

  it('#toVector3 should return expected Vector3 for (360, 0, 1)', () => {
    assertVectorExected(util.toVector3(360, 0, 1), 1, 0, 0);
  });

  /* 0-meridian with 45° step */
  it('#toVector3 should return expected Vector3 for (0, 0, 1)', () => {
    assertVectorExected(util.toVector3(0, 0, 1), 1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (0, 45, 1)', () => {
    assertVectorExected(util.toVector3(0, 45, 1), 0.707, 0, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (0, 90, 1)', () => {
    assertVectorExected(util.toVector3(0, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (180, 90, 1)', () => {
    assertVectorExected(util.toVector3(180, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (180, 45, 1)', () => {
    assertVectorExected(util.toVector3(180, 45, 1), -0.707, 0, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (180, 0, 1)', () => {
    assertVectorExected(util.toVector3(180, 0, 1), -1, 0, 0);
  });

  it('#toVector3 should return expected Vector3 for (180, -45, 1)', () => {
    assertVectorExected(util.toVector3(180, -45, 1), -0.707, 0, -0.707);
  });

  it('#toVector3 should return expected Vector3 for (180, -90, 1)', () => {
    assertVectorExected(util.toVector3(180, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (0, -90, 1)', () => {
    assertVectorExected(util.toVector3(0, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (0, -45, 1)', () => {
    assertVectorExected(util.toVector3(0, -45, 1), 0.707, 0, -0.707);
  });

  /* WE-meridian with 45° step */

  it('#toVector3 should return expected Vector3 for (90, 0, 1)', () => {
    assertVectorExected(util.toVector3(90, 0, 1), 0, 1, 0);
  });

  it('#toVector3 should return expected Vector3 for (90, 45, 1)', () => {
    assertVectorExected(util.toVector3(90, 45, 1), 0, 0.707, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (90, 90, 1)', () => {
    assertVectorExected(util.toVector3(90, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (270, 90, 1)', () => {
    assertVectorExected(util.toVector3(270, 90, 1), 0, 0, 1);
  });

  it('#toVector3 should return expected Vector3 for (270, 45, 1)', () => {
    assertVectorExected(util.toVector3(270, 45, 1), 0, -0.707, 0.707);
  });

  it('#toVector3 should return expected Vector3 for (270, 0, 1)', () => {
    assertVectorExected(util.toVector3(270, 0, 1), 0, -1, 0);
  });

  it('#toVector3 should return expected Vector3 for (270, -45, 1)', () => {
    assertVectorExected(util.toVector3(270, -45, 1), 0, -0.707, -0.707);
  });

  it('#toVector3 should return expected Vector3 for (270, -90, 1)', () => {
    assertVectorExected(util.toVector3(270, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (90, -90, 1)', () => {
    assertVectorExected(util.toVector3(90, -90, 1), 0, 0, -1);
  });

  it('#toVector3 should return expected Vector3 for (90, -45, 1)', () => {
    assertVectorExected(util.toVector3(90, -45, 1), 0, 0.707, -0.707);
  });

});
