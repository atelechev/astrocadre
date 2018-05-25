import { Color, Material, LineBasicMaterial, PointsMaterial, TextureLoader } from 'three';
import { Layers } from '../../core/layers';
import { ThemeDefinition } from './theme-definition';
import { TextStyle } from '../text-style';
import { MaterialsFactory, TextStylesFactory } from './abstract-factories';
import { SkyGridMaterialsFactory } from './sky-grid-materials-factory';
import { ConstellationBoundariesMaterialsFactory } from './constellation-boundaries-materials-factory';
import { ConstellationLinesMaterialsFactory } from './constellation-lines-materials-factory';
import { StarsMaterialsFactory } from './stars-materials-factory';
import { ConstellationNamesTextStylesFactory } from './constellation-names-text-style-factory';

export class Theme {

  private static readonly FACTORIES_MATERIALS: Map<string, MaterialsFactory> = Theme.initMaterialsFactories();

  private static readonly FACTORIES_TEXTSTYLES: Map<string, TextStylesFactory> = Theme.initTextStylesFactories();

  private backgroundColor: Color;

  private materialsByLayer: Map<string, Map<string, Material>>;

  private textStyleByLayer: Map<string, Map<string, TextStyle>>;

  constructor(private themeDef: ThemeDefinition) {
    if (!themeDef) {
      throw new Error('Failed to create Theme: undefined themeDef arg');
    }
    this.materialsByLayer = this.initMaterialsMap();
    this.textStyleByLayer = this.initTextStyles();
    this.backgroundColor = new Color(this.themeDef.background.color);
  }

  private static initMaterialsFactories(): Map<string, MaterialsFactory> {
    const factories = new Map<string, MaterialsFactory>();
    factories.set(Layers.SKY_GRID, new SkyGridMaterialsFactory());
    factories.set(Layers.CONSTELLATION_BOUNDARIES, new ConstellationBoundariesMaterialsFactory());
    factories.set(Layers.CONSTELLATION_LINES, new ConstellationLinesMaterialsFactory());
    factories.set(Layers.STARS, new StarsMaterialsFactory());
    return factories;
  }

  private static initTextStylesFactories(): Map<string, TextStylesFactory> {
    const factories = new Map<string, TextStylesFactory>();
    factories.set(Layers.CONSTELLATION_NAMES, new ConstellationNamesTextStylesFactory());
    return factories;
  }

  private buildMaterialsForLayer(layer: string): Map<string, Material> {
    return Theme.FACTORIES_MATERIALS.get(layer).buildMaterials(this.themeDef);
  }

  private initMaterialsMap(): Map<string, Map<string, Material>> {
    const materials = new Map<string, Map<string, Material>>();
    const layers = [ Layers.SKY_GRID,
                     Layers.CONSTELLATION_BOUNDARIES,
                     Layers.CONSTELLATION_LINES,
                     Layers.STARS ];
    layers.forEach(
      (layer: string) => materials.set(layer, this.buildMaterialsForLayer(layer))
    );
    return materials;
  }

  private buildTextStylesForLayer(layer: string): Map<string, TextStyle> {
    return Theme.FACTORIES_TEXTSTYLES.get(layer).buildTextStyles(this.themeDef);
  }

  private initTextStyles(): Map<string, Map<string, TextStyle>> {
    const styles = new Map<string, Map<string, TextStyle>>();
    const layers = [ Layers.CONSTELLATION_NAMES ];
    layers.forEach(
      (layer: string) => styles.set(layer, this.buildTextStylesForLayer(layer))
    );
    // TODO
    styles.set(Layers.STARS, this.initStarsTextStyles());
    return styles;
  }

  private initStarsTextStyles(): Map<string, TextStyle> {
    const starsLabels = new Map<string, TextStyle>();
    starsLabels.set('names-proper', this.themeDef.stars.names.proper);
    starsLabels.set('names-standard', this.themeDef.stars.names.standard);
    return starsLabels;
  }

  public getBackgroundColor(): Color {
    return this.backgroundColor;
  }

  public getName(): string {
    return this.themeDef.name;
  }

  public getRenderedStarMagnitudes(): number[] {
    return this.themeDef.stars.magnitudes;
  }

  public getMinShownMagnitude(): number {
    return this.themeDef.stars.magnitudes[0];
  }

  public getMaxShownMagnitude(): number {
    const allMagnitudes = this.themeDef.stars.magnitudes;
    return allMagnitudes[allMagnitudes.length - 1];
  }

  public getMaterialsForLayer(layer: string): Map<string, Material> {
    if (!this.materialsByLayer.has(layer)) {
      throw new Error(`Unexpected layer name: '${layer}'`);
    }
    return this.materialsByLayer.get(layer);
  }

  public getTextStylesForLayer(layer: string): Map<string, TextStyle> {
    const starsNormalizedLayer = this.getLayerNameWithoutStarsMag(layer);
    if (!this.textStyleByLayer.has(starsNormalizedLayer)) {
      throw new Error(`Unexpected layer name: '${layer}'`);
    }
    return this.textStyleByLayer.get(starsNormalizedLayer);
  }

  public getMaterialForLayer(layer: string, materialKey: string): Material {
    const layerMaterials = this.getMaterialsForLayer(layer);
    if (!layerMaterials.has(materialKey)) {
      throw new Error(`Unexpected material key '${materialKey}' for layer '${layer}'`);
    }
    return layerMaterials.get(materialKey);
  }

  private getLayerNameWithoutStarsMag(layer: string): string {
    return layer && layer.startsWith(Layers.STARS + '-mag') ? Layers.STARS : layer;
  }

  public getTextStyleForLayer(layer: string, styleKey: string): TextStyle {
    const layerStyles = this.getTextStylesForLayer(layer);
    if (!layerStyles.has(styleKey)) {
      throw new Error(`Unexpected style key '${styleKey}' for layer '${layer}'`);
    }
    return layerStyles.get(styleKey);
  }

}
