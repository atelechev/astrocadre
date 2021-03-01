import { LineBasicMaterial, Material } from 'three';
import { MaterialsFactory } from '#core/models/abstract-factories';
import { Layers } from '#core/models/layers';
import { ThemeDefinition } from '#core/models/theme-definition';

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
