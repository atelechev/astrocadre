import { Injectable } from '@angular/core';
import { Theme } from './theme';
import { Color, Material, LineBasicMaterial, TextureLoader, PointsMaterial } from 'three';
import { Themes } from './themes';


@Injectable()
export class ThemeSkyChartService extends Theme {

  constructor() {
    super(Themes.SKY_CHART, new Color(0xffffff));
  }

  protected getSkyGridMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0xaaaaaa }));
    materials.set('line-reference', new LineBasicMaterial({ color : 0x999999, linewidth: 2 }));
    return materials;
  }

  protected getConstellationBoundariesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0x666666 }));
    return materials;
  }

  protected getConstellationLinesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0xcccccc }));
    return materials;
  }

  protected getStarsMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    const textureLoader = new TextureLoader();
    this.getRenderedStarMagnitudes().forEach(magClass => {
      const materialKey = 'star-' + magClass.toFixed(1);
      const material = this.getMaterialForMagnitudeClass(magClass, textureLoader);
      materials.set(materialKey, material);
    })
    return materials;
  }

  private getMaterialForMagnitudeClass(magClass: number, textureLoader: TextureLoader): Material {
    const dotSizeMultiplier = 3;
    const dotSize = (6.5 - magClass) * dotSizeMultiplier;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                transparent: true,
                                opacity: 0.9,
                                alphaTest: 0.1,
                                map: textureLoader.load('assets/textures/star_black.png') } );
  }


}