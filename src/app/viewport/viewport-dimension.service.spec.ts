import { ViewportDimensionService } from './viewport-dimension.service';
import { TestBed } from '@angular/core/testing';


describe('ViewportDimensionService', () => {

  let service: ViewportDimensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewportDimensionService] });
    service = TestBed.get(ViewportDimensionService);
  });

  const width = 'width';
  const height = 'height';

  const assertErrorExpected = (setterFunct: () => void, axis: string) => {
    expect(() => setterFunct()).toThrow(new Error(`${axis} must be in range [1, 16384]`));
  };

  it('#setWidth must throw expected error for negative arg', () => {
    assertErrorExpected(() => service.setWidth(-1), width);
  });

  it('#setWidth must throw expected error for zero arg', () => {
    assertErrorExpected(() => service.setWidth(0), width);
  });

  it('#setWidth must throw expected error for arg greater than max supported', () => {
    assertErrorExpected(() => service.setWidth(16385), width);
  });

  it('#setWidth should set the width from valid value', () => {
    const value = 100;
    service.setWidth(value);
    expect(service.getWidth()).toBe(value);
  });

  it('#setHeight must throw expected error for negative arg', () => {
    assertErrorExpected(() => service.setHeight(-1), height);
  });

  it('#setHeight must throw expected error for zero arg', () => {
    assertErrorExpected(() => service.setHeight(0), height);
  });

  it('#setHeight must throw expected error for arg greater than max supported', () => {
    assertErrorExpected(() => service.setHeight(16385), height);
  });

  it('#setHeight should set the height from valid value', () => {
    const value = 100;
    service.setHeight(value);
    expect(service.getHeight()).toBe(value);
  });

  const ensureViewportDimenstion = (w: number, h: number) => {
    service.setWidth(w);
    service.setHeight(h);
  };

  const coord = (x: number, y: number) => {
    return { x: x, y: y };
  };

  it('#isInBounds should return false for a point to the top of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(5, -1))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the top right of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(11, -1))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the right of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(11, 5))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the bottom right of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(11, 11))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the bottom of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(5, 11))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the bottom left of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(-1, 11))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the left of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(-1, 5))).toBeFalsy();
  });

  it('#isInBounds should return false for a point to the top left of the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(-1, -1))).toBeFalsy();
  });

  it('#isInBounds should return true for a point inside the viewport', () => {
    ensureViewportDimenstion(10, 10);
    expect(service.isInBounds(coord(5, 5))).toBeTruthy();
  });

  it('#getAspect returns 1 when width is equal to height', () => {
    ensureViewportDimenstion(100, 100);
    expect(service.getAspect()).toBeCloseTo(1, 3);
  });

  it('#getAspect returns 0.5 when width is two times lower than height', () => {
    ensureViewportDimenstion(100, 200);
    expect(service.getAspect()).toBeCloseTo(0.5, 3);
  });

  it('#getAspect returns 2 when width is two times greater than height', () => {
    ensureViewportDimenstion(200, 100);
    expect(service.getAspect()).toBeCloseTo(2, 3);
  });

});
