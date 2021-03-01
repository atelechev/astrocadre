import { Material } from 'three';
import { ThemeDefinition } from '#core/models/theme-definition';
import { LayerAware } from '#core/models/layer-aware';
import { TextStyle } from '#core/models/text-style';

/**
 * Provides a common validation method for ThemeDefinition argument
 * processed in descendants.
 */
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

/**
 * Base factory class to produce Three's Materials.
 */
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

/**
 * Base factory class to produce label text styles.
 */
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
