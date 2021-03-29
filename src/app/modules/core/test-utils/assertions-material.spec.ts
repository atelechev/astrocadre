import { Materials } from 'src/app/modules/core/models/materials';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';
import { LineBasicMaterial, LineSegments } from 'three';

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
