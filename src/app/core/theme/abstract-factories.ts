import { Material } from 'three';
import { ThemeDefinition } from './theme-definition';
import { LayerAware } from '../layer-aware';

abstract class EnsuringThemeDefinitionValid extends LayerAware {

  constructor(targetLayer: string) {
    super(targetLayer);
  }

  protected ensureThemeDefined(themeDef: ThemeDefinition): void {
    if (!themeDef) {
      throw new Error(`Missing theme definition in ${this.constructor.name}`);
    }
  }

}

export abstract class MaterialsFactory extends EnsuringThemeDefinitionValid {

  constructor(targetLayer: string) {
    super(targetLayer);
  }

  public abstract buildMaterials(themeDef: ThemeDefinition): Map<string, Material>;

}
