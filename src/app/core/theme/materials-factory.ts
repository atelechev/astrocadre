import { Material } from 'three';
import { ThemeDefinition } from './theme-definition';
import { LayerAware } from '../layer-aware';

export abstract class MaterialsFactory extends LayerAware {

  constructor(targetLayer: string) {
    super(targetLayer);
  }

  public abstract buildMaterials(themeDef: ThemeDefinition): Map<string, Material>;

  protected ensureThemeDefined(themeDef: ThemeDefinition): void {
    if (!themeDef) {
      throw new Error(`Missing theme definition in MaterialsFactory for layer ${this.layerCode}`);
    }
  }

}
