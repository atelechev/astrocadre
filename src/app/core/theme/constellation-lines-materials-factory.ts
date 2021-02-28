import { LineBasicMaterial, Material } from 'three';
import { Layers } from '#core/layers';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { MaterialsFactory } from '#core-theme/abstract-factories';

export class ConstellationLinesMaterialsFactory extends MaterialsFactory {

  constructor() {
    super(Layers.CONSTELLATION_LINES);
  }

  protected buildMaterialsWith(themeDef: ThemeDefinition): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color: themeDef.constellation.lines.line.common }));
    return materials;
  }

}
