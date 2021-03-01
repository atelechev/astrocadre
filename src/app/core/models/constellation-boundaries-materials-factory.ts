import { LineBasicMaterial, Material } from 'three';
import { MaterialsFactory } from '#core/models/abstract-factories';
import { Layers } from '#core/models/layers';
import { ThemeDefinition } from '#core/models/theme-definition';


export class ConstellationBoundariesMaterialsFactory extends MaterialsFactory {

  constructor() {
    super(Layers.CONSTELLATION_BOUNDARIES);
  }

  protected buildMaterialsWith(themeDef: ThemeDefinition): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color: themeDef.constellation.boundaries.line.common }));
    return materials;
  }

}
