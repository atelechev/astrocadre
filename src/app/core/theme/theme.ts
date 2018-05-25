import { Color, Material } from 'three';
import { Layers } from '../../core/layers';
import { ThemeDefinition } from './theme-definition';
import { TextStyle } from '../text-style';
import { MaterialsFactory, TextStylesFactory } from './abstract-factories';
import { SkyGridMaterialsFactory } from './sky-grid-materials-factory';
import { ConstellationBoundariesMaterialsFactory } from './constellation-boundaries-materials-factory';
import { ConstellationLinesMaterialsFactory } from './constellation-lines-materials-factory';
import { StarsMaterialsFactory } from './stars-materials-factory';
import { ConstellationNamesTextStylesFactory } from './constellation-names-text-style-factory';
import { StarsTextStyleFactory } from './stars-text-style-factory';

/**
 * Wraps a ThemeDefinition in order to transform its input raw data into objects
 * of target types. Main object used to define a graphics theme and access its properties.
 */
export class Theme {

  private static readonly FACTORIES_MATERIALS: Map<string, MaterialsFactory> = Theme.initMaterialsFactories();

  private static readonly FACTORIES_TEXTSTYLES: Map<string, TextStylesFactory> = Theme.initTextStylesFactories();

  private backgroundColor: Color;

  private materialsByLayer: Map<string, Map<string, Material>>;

  private textStylesByLayer: Map<string, Map<string, TextStyle>>;

  constructor(private themeDef: ThemeDefinition) {
    if (!themeDef) {
      throw new Error('Failed to create Theme: undefined themeDef arg');
    }
    this.materialsByLayer = this.initMaterialsMap();
    this.textStylesByLayer = this.initTextStyles();
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
    factories.set(Layers.STARS, new StarsTextStyleFactory());
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
    const layers = [
      Layers.CONSTELLATION_NAMES,
      Layers.STARS
    ];
    layers.forEach(
      (layer: string) => styles.set(layer, this.buildTextStylesForLayer(layer))
    );
    return styles;
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
    this.ensureLayerKeyPresent(this.materialsByLayer, layer);
    return this.materialsByLayer.get(layer);
  }

  private ensureLayerKeyPresent(map: Map<string, any>, layerKey: string): void {
    if (!map.has(layerKey)) {
      throw new Error(`Unexpected layer name: '${layerKey}'`);
    }
  }

  public getTextStylesForLayer(layer: string): Map<string, TextStyle> {
    const starsNormalizedLayer = this.getLayerNameWithoutStarsMag(layer);
    this.ensureLayerKeyPresent(this.textStylesByLayer, starsNormalizedLayer);
    return this.textStylesByLayer.get(starsNormalizedLayer);
  }

  private ensureMaterialOrStyleKeyPresent(map: Map<string, any>,
                                          layerKey: string,
                                          targetKey: string): void {
    if (!map.has(targetKey)) {
      throw new Error(`Unexpected key '${targetKey}' for layer '${layerKey}'`);
    }
  }

  public getMaterialForLayer(layer: string, materialKey: string): Material {
    const layerMaterials = this.getMaterialsForLayer(layer);
    this.ensureMaterialOrStyleKeyPresent(layerMaterials, layer, materialKey);
    return layerMaterials.get(materialKey);
  }

  private getLayerNameWithoutStarsMag(layer: string): string {
    return layer && layer.startsWith(Layers.STARS + '-mag') ? Layers.STARS : layer;
  }

  public getTextStyleForLayer(layer: string, styleKey: string): TextStyle {
    const layerStyles = this.getTextStylesForLayer(layer);
    this.ensureMaterialOrStyleKeyPresent(layerStyles, layer, styleKey);
    return layerStyles.get(styleKey);
  }

}
