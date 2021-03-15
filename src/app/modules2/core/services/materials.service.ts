import { Injectable } from '@angular/core';
import { SupportedLayers } from 'src/app/modules2/core/models/supported-layers';
import { TextStyle } from 'src/app/modules2/core/models/text-style';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { LineBasicMaterial, Material } from 'three';


@Injectable()
export class MaterialsService {

  constructor(private readonly _themeService: ThemeService) {

  }

  public getMaterialsForLayer(code: string): Map<string, Material> {
    switch (code) {
      case SupportedLayers.SKY_GRID: return this.buildSkyGridMaterials();
      case SupportedLayers.CONSTELLATION_BOUNDARIES: return this.buildConstellationBoundariesMaterials();
      case SupportedLayers.CONSTELLATION_LINES: return this.buildConstellationLinesMaterials();
      default: throw new Error(`Unsupported layer: ${code}`);
    }
  }

  public getTextStyleForLayer(code: string): Map<string, TextStyle> {
    switch (code) {
      case SupportedLayers.CONSTELLATION_NAMES: return this.buildConstellationNamesStyles();
      default: throw new Error(`Unsupported layer: ${code}`);
    }
  }

  private buildSkyGridMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set('line-common', new LineBasicMaterial({ color: theme.skyGrid.line.common })); // TODO extract constant
      materials.set('line-reference', new LineBasicMaterial({ color: theme.skyGrid.line.reference }));
    }
    return materials;
  }

  private buildConstellationBoundariesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set('line-common', new LineBasicMaterial({ color: theme.constellation.boundaries.line.common }));
    }
    return materials;
  }

  private buildConstellationLinesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const theme = this._themeService.theme;
    if (theme) {
      materials.set('line-common', new LineBasicMaterial({ color: theme.constellation.lines.line.common }));
    }
    return materials;
  }

  private buildConstellationNamesStyles(): Map<string, TextStyle> {
    const styles = new Map<string, TextStyle>();
    const theme = this._themeService.theme;
    if (theme) {
      styles.set('labels', theme.constellation.names);
    }
    return styles;
  }

}
