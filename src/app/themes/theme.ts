import { Color, Material } from 'three';
import { Layers } from '../layers/layers';
import { OnInit } from '@angular/core';

export abstract class Theme {

  // TODO should be configurable by theme
  // but the current init sequence does not allow to move it there directly
  private renderedStarMagnitudes = [ 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6 ];

  private materialsByLayer: Map<string, Map<string, Material>>;

  constructor(private name: string,
              private bgrColor: Color) {
    this.materialsByLayer = this.initMaterialsMap();
  }

  private initMaterialsMap(): Map<string, Map<string, Material>> {
    const materials = new Map<string, Map<string, Material>>();
    materials.set(Layers.SKY_GRID, this.getSkyGridMaterials());
    materials.set(Layers.CONSTELLATION_BOUNDARIES, this.getConstellationBoundariesMaterials());
    materials.set(Layers.CONSTELLATION_LINES, this.getConstellationLinesMaterials());
    materials.set(Layers.STARS, this.getStarsMaterials());
    return materials;
  }

  protected abstract getSkyGridMaterials(): Map<string, Material>;

  protected abstract getConstellationBoundariesMaterials(): Map<string, Material>;

  protected abstract getConstellationLinesMaterials(): Map<string, Material>;

  protected abstract getStarsMaterials(): Map<string, Material>;

  public getBackgroundColor(): Color {
    return this.bgrColor;
  }

  public getName(): string {
    return this.name;
  }

  public getRenderedStarMagnitudes(): number[] {
    return this.renderedStarMagnitudes;
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
