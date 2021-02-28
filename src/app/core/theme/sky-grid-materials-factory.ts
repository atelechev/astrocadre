import { LineBasicMaterial, Material } from 'three';
import { Layers } from '#core/layers';
import { MaterialsFactory } from '#core-theme/abstract-factories';
import { ThemeDefinition } from '#core-theme/theme-definition';

export class SkyGridMaterialsFactory extends MaterialsFactory {

  constructor() {
    super(Layers.SKY_GRID);
  }

  protected buildMaterialsWith(themeDef: ThemeDefinition): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color: themeDef.skyGrid.line.common }));
    materials.set('line-reference', new LineBasicMaterial({ color: themeDef.skyGrid.line.reference }));
    return materials;
  }

}
