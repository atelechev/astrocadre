import { Injectable } from '@angular/core';
import { Theme } from './theme';
import { Color, Material, LineBasicMaterial, TextureLoader, PointsMaterial } from 'three';
import { Themes } from './themes';

@Injectable()
export class ThemeDevService extends Theme {

  constructor() {
    super(Themes.DEV, new Color(0x02002c));
  }

  protected getSkyGridMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0x2821af }));
    materials.set('line-reference', new LineBasicMaterial({ color : 0x00ff99 }));
    return materials;
  }

  protected getConstellationBoundariesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0x5e56ef }));
    return materials;
  }

  protected getConstellationLinesMaterials(): Map<string, Material> {
    const materials = new Map<string, Material>();
    materials.set('line-common', new LineBasicMaterial({ color : 0xff56ef }));
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
    const dotSizeMultiplier = 2.5;
    const dotSize = (6.5 - magClass) * dotSizeMultiplier;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                transparent: true,
                                opacity: 0.95,
                                alphaTest: 0.05,
                                map: textureLoader.load('assets/textures/star_yellow.png') } );
  }

}