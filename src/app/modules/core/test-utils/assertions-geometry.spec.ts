import { BufferGeometry } from 'three';


export const assertGeometryExpected = (checked: BufferGeometry, expected: number[][]): void => {
  const vertices = checked.getAttribute('position').array;
  const precision = 3;
  expect(vertices.length % 3).toBe(0);
  for (let i = 0, j = 0; i < vertices.length; i += 3, j++) {
    const vertex = expected[j];
    expect(vertices[i]).toBeCloseTo(vertex[0], precision);
    expect(vertices[i + 1]).toBeCloseTo(vertex[1], precision);
    expect(vertices[i + 2]).toBeCloseTo(vertex[2], precision);
  }
};
