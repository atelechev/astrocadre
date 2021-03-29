import { LineBasicMaterial, LineSegments } from 'three';
import { Materials } from '#core/models/materials';
import { TestContext } from '#core/test-utils/test-context.spec';

export const assertMaterialExpected = (
  ctx: TestContext,
  object: LineSegments,
  layerCode: string
): void => {
  const assignedMaterial = object.material as LineBasicMaterial;
  expect(assignedMaterial).toBeDefined();
  const expectedMaterial = ctx.materialsService
    .getMaterialsForLayer(layerCode)
    .get(Materials.LINE_COMMON) as LineBasicMaterial;
  expect(expectedMaterial).toBeDefined();
  expect(assignedMaterial.color).toEqual(expectedMaterial.color);
};
