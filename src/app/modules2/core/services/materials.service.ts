import { Injectable } from '@angular/core';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { LineBasicMaterial, Material } from 'three';


@Injectable()
export class MaterialsService {

  constructor(private readonly _themeService: ThemeService) {

  }

  public getMaterialsForLayer(code: string): Map<string, Material> {
    switch (code) {
      case 'sky-grid': return this.buildSkyGridMaterials();
      case 'constellation-boundaries': return this.buildConstellationBoundariesMaterials();
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
    materials.set('line-common', new LineBasicMaterial({ color: theme.constellation.boundaries.line.common }));
    return materials;
  }

}
