import { MaterialsFactory } from './abstract-factories';
import { Layers } from '../layers';
import { ThemeDefinition } from './theme-definition';
import { Material, TextureLoader, PointsMaterial } from 'three';


export class StarsMaterialsFactory extends MaterialsFactory {

  private textureLoader: TextureLoader;

  constructor() {
    super(Layers.STARS);
    this.textureLoader = new TextureLoader();
  }

  public buildMaterials(themeDef: ThemeDefinition): Map<string, Material> {
    this.ensureThemeDefined(themeDef);
    const materials = new Map<string, Material>();
    const sizeMultiplier = themeDef.stars.texture.sizeMultiplier;
    const textureFile = themeDef.stars.texture.image;
    themeDef.stars.magnitudes.forEach(magClass => {
      const materialKey = 'star-' + magClass.toFixed(1);
      const material = this.getMaterialForMagnitudeClass(magClass, textureFile, sizeMultiplier);
      materials.set(materialKey, material);
    });
    return materials;
  }

  private getMaterialForMagnitudeClass(magClass: number,
                                       textureFile: string,
                                       sizeMultiplier: number,
                                       ): Material {
    const dotSize = (6.5 - magClass) * sizeMultiplier;
    return new PointsMaterial({ size: dotSize,
                                sizeAttenuation: false,
                                transparent: true,
                                opacity: 0.95,
                                alphaTest: 0.05,
                                map: this.textureLoader.load(textureFile) } );
  }

}
