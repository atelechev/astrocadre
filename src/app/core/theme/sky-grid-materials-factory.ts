import { MaterialsFactory } from './abstract-factories';
import { Layers } from '../layers';
import { ThemeDefinition } from './theme-definition';
import { Material, LineBasicMaterial } from 'three';

export class SkyGridMaterialsFactory extends MaterialsFactory {

  constructor() {
    super(Layers.SKY_GRID);
  }

  public buildMaterials(themeDef: ThemeDefinition): Map<string, Material> {
    this.ensureThemeDefined(themeDef);
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : themeDef.skyGrid.line.common }));
    materials.set('line-reference', new LineBasicMaterial({ color : themeDef.skyGrid.line.reference }));
    return materials;
  }

}
