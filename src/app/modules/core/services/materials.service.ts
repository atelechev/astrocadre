import { Injectable } from '@angular/core';
import { Materials } from 'src/app/modules/core/models/materials';
import { SupportedLayers } from 'src/app/modules/core/models/supported-layers';
import { TextStyle } from 'src/app/modules/core/models/text-style';
import { ThemeService } from 'src/app/modules/core/services/theme.service';
import {
  LineBasicMaterial,
  Material,
  PointsMaterial,
  TextureLoader
  } from 'three';
import { environment } from '#environments/environment';


@Injectable()
export class MaterialsService {

  private readonly _textureLoader: TextureLoader;

  constructor(private readonly _themeService: ThemeService) {
    this._textureLoader = new TextureLoader();
  }

  public getMaterialsForLayer(code: string): Map<string, Material> {
    switch (code) {
      case SupportedLayers.SKY_GRID: return this.buildSkyGridMaterials();
      case SupportedLayers.CONSTELLATION_BOUNDARIES: return this.buildConstellationBoundariesMaterials();
      case SupportedLayers.CONSTELLATION_LINES: return this.buildConstellationLinesMaterials();
      case SupportedLayers.STARS: return this.buildStarsMaterials();
      default: throw new Error(`Unsupported layer: ${code}`);
    }
  }

  public getTextStyleForLayer(code: string): Map<string, TextStyle> {
    switch (code) {
      case SupportedLayers.CONSTELLATION_NAMES: return this.buildConstellationNamesStyles();
      case SupportedLayers.STARS: return this.buildStarsStyles();
      default: throw new Error(`Unsupported layer: ${code}`);
    }
  }

  private buildSkyGridMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set(Materials.LINE_COMMON, new LineBasicMaterial({ color: theme.skyGrid.line.common }));
      materials.set(Materials.LINE_REFERENCE, new LineBasicMaterial({ color: theme.skyGrid.line.reference }));
    }
    return materials;
  }

  private buildConstellationBoundariesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set(Materials.LINE_COMMON, new LineBasicMaterial({ color: theme.constellation.boundaries.line.common }));
    }
    return materials;
  }

  private buildConstellationLinesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set(Materials.LINE_COMMON, new LineBasicMaterial({ color: theme.constellation.lines.line.common }));
    }
    return materials;
  }

  private buildConstellationNamesStyles(): Map<string, TextStyle> {
    const styles = new Map<string, TextStyle>();
    const theme = this._themeService.theme;
    if (theme) {
      styles.set(Materials.LABELS, theme.constellation.names);
    }
    return styles;
  }

  private buildStarsMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    const sizeMultiplier = theme.stars.texture.sizeMultiplier;
    const textureFile = environment.pathInContext(theme.stars.texture.image);
    theme.stars.magnitudes.forEach(magClass => {
      const materialKey = 'star-' + magClass.toFixed(1);
      const material = this.getMaterialForMagnitudeClass(magClass, textureFile, sizeMultiplier);
      materials.set(materialKey, material);
    });
    return materials;
  }

  private getMaterialForMagnitudeClass(
    magClass: number,
    textureFile: string,
    sizeMultiplier: number,
  ): Material {
    const dotSize = (6.5 - magClass) * sizeMultiplier;
    return new PointsMaterial({
      size: dotSize,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.05,
      map: this._textureLoader.load(textureFile)
    });
  }

  private buildStarsStyles(): Map<string, TextStyle> {
    const styles = new Map<string, TextStyle>();
    const theme = this._themeService.theme;
    if (theme) {
      styles.set(Materials.NAMES_PROPER, theme.stars.names.proper);
      styles.set(Materials.NAMES_STANDARD, theme.stars.names.standard);
    }
    return styles;
  }

}
