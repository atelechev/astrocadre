import { LineBasicMaterial, Material } from 'three';
import { MaterialsFactory } from '#core-theme/abstract-factories';
import { Layers } from '#core/layers';
import { ThemeDefinition } from '#core-theme/theme-definition';


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
