import { MaterialsFactory } from './materials-factory';
import { Layers } from '../layers';
import { ThemeDefinition } from './theme-definition';
import { Material, LineBasicMaterial } from 'three';

export class ConstellationLinesMaterialsFactory extends MaterialsFactory {

  constructor() {
    super(Layers.CONSTELLATION_LINES);
  }

  public buildMaterials(themeDef: ThemeDefinition): Map<string, Material> {
    this.ensureThemeDefined(themeDef);
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : themeDef.constellation.lines.line.common }));
    return materials;
  }

}