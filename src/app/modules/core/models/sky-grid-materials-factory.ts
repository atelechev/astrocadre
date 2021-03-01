import { LineBasicMaterial, Material } from 'three';
import { MaterialsFactory } from '#core/models/abstract-factories';
import { Layers } from '#core/models/layers';
import { ThemeDefinition } from '#core/models/theme-definition';

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
