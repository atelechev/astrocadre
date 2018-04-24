import { Color, Material, LineBasicMaterial, PointsMaterial, TextureLoader } from 'three';
import { Layers } from '../layers/layers';
import { ThemeDefinition } from './theme-definition';

export class Theme {

  private backgroundColor: Color;

  private materialsByLayer: Map<string, Map<string, Material>>;

  constructor(private themeDef: ThemeDefinition) {
    this.materialsByLayer = this.initMaterialsMap();
    this.backgroundColor = new Color(this.themeDef.background.color);
  }

  private initMaterialsMap(): Map<string, Map<string, Material>> {
    const materials = new Map<string, Map<string, Material>>();
    materials.set(Layers.SKY_GRID, this.getSkyGridMaterials());
    materials.set(Layers.CONSTELLATION_BOUNDARIES, this.getConstellationBoundariesMaterials());
    materials.set(Layers.CONSTELLATION_LINES, this.getConstellationLinesMaterials());
    materials.set(Layers.STARS, this.getStarsMaterials());
    return materials;
  }

  private getSkyGridMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : this.themeDef.skyGrid.line.common }));
    materials.set('line-reference', new LineBasicMaterial({ color : this.themeDef.skyGrid.line.reference }));
    return materials;
  }

  private getConstellationBoundariesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : this.themeDef.constellation.boundaries.line.common }));
    return materials;
  }

  private getConstellationLinesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : this.themeDef.constellation.lines.line.common }));
    return materials;
  }

  private getStarsMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const textureLoader = new TextureLoader();
    this.getRenderedStarMagnitudes().forEach(magClass => {
      const materialKey = 'star-' + magClass.toFixed(1);
      const material = this.getMaterialForMagnitudeClass(magClass, textureLoader);
      materials.set(materialKey, material);
    });
    return materials;
  }

  private getMaterialForMagnitudeClass(magClass: number, textureLoader: TextureLoader): Material {
    const dotSizeMultiplier = this.themeDef.stars.texture.sizeMultiplier;
    const dotSize = (6.5 - magClass) * dotSizeMultiplier;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                transparent: true,
                                opacity: 0.95,
                                alphaTest: 0.05,
                                map: textureLoader.load(this.themeDef.stars.texture.image) } );
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

  public getMaterialsForLayer(layerName: string): Map<string, Material> {
    if (!this.materialsByLayer.has(layerName)) {
      throw new Error(`Unexpected layer name: '${layerName}'`);
    }
    return this.materialsByLayer.get(layerName);
  }

  public getMaterialForLayer(layerName: string, materialKey: string): Material {
    const layer = this.getMaterialsForLayer(layerName);
    if (!layer.has(materialKey)) {
      throw new Error(`Unexpected material key '${materialKey}' for layer '${layerName}'`);
    }
    return layer.get(materialKey);
  }

}