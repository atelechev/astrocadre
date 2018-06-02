import { BufferGeometry } from 'three';

export const assertSegmentsArgMustBeDefined = (callFunct: () => void): void => {
  expect(() => callFunct())
      .toThrow(new Error('segments arg must be defined, but was \'undefined\''));
};

export const assertSegmentsArgMustNotBeEmpty = (callFunct: () => void): void => {
  expect(() => callFunct())
      .toThrow(new Error('segments arg must be defined, but was \'[]\''));
};

export const assertGeometryExpected = (checked: BufferGeometry, expected: number[][]): void => {
  const vertices = checked.getAttribute('position').array;
  const precision = 3;
  expect(vertices.length % 3).toBe(0);
  for (let i = 0; i < expected.length; i++) {
    const vertex = expected[i];
    expect(vertices[i * 3]).toBeCloseTo(vertex[0], precision);
    expect(vertices[i * 3 + 1]).toBeCloseTo(vertex[1], precision);
    expect(vertices[i * 3 + 2]).toBeCloseTo(vertex[2], precision);
  }
};
