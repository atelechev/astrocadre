import { Material } from 'three';
import { ThemeDefinition } from './theme-definition';
import { LayerAware } from '../layer-aware';
import { TextStyle } from '../text-style';

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

  public buildMaterials(themeDef: ThemeDefinition): Map<string, Material> {
    this.ensureThemeDefined(themeDef);
    return this.buildMaterialsWith(themeDef);
  }

  protected abstract buildMaterialsWith(themeDef: ThemeDefinition): Map<string, Material>;

}

export abstract class TextStylesFactory extends EnsuringThemeDefinitionValid {

  constructor(targetLayer: string) {
    super(targetLayer);
  }

  public buildTextStyles(themeDef: ThemeDefinition): Map<string, TextStyle> {
    this.ensureThemeDefined(themeDef);
    return this.buildTextStylesWith(themeDef);
  }

  protected abstract buildTextStylesWith(themeDef: ThemeDefinition): Map<string, TextStyle>;

}
