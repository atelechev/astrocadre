import { Material } from 'three';
import { ThemeDefinition } from './theme-definition';

export abstract class MaterialsFactory {

  public readonly targetLayerName: string;

  constructor(targetLayer: string) {
    this.targetLayerName = targetLayer;
  }

  public abstract buildMaterials(themeDef: ThemeDefinition): Map<string, Material>;

  protected ensureThemeDefined(themeDef: ThemeDefinition): void {
    if (!themeDef) {
      throw new Error(`Missing theme definition in MaterialsFactory for layer ${this.targetLayerName}`);
    }
  }

}
