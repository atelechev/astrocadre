import {
  Material,
  Object3D,
  Points,
  PointsMaterial,
  TextureLoader
  } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { environment } from '#environments/environment';
import { TextureStyle } from '#core/models/theme/texture-style';


export class Messier extends RenderableLayer {

  private readonly _textureLoader: TextureLoader;

  constructor(
    model: Layer,
    private readonly _clusters: Points,
    private readonly _galaxies: Points,
    private readonly _nebulas: Points,
    private readonly _other: Points,
    private readonly _labels: Array<RenderableText>
  ) {
    super(model);
    this._textureLoader = new TextureLoader();
  }

  public get objects(): Array<Object3D> {
    return [
      this._clusters,
      this._galaxies,
      this._nebulas,
      this._other
    ];
  }

  public get texts(): Array<RenderableText> {
    return this._labels;
  }

  public get searchables(): Array<Searchable> {
    return this.model.objects;
  }

  public applyTheme(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  private useThemeForObjects(theme: Theme): void {
    this.buildMaterialForObjects(this._clusters, theme.messier.objects.cluster);
    this.buildMaterialForObjects(this._galaxies, theme.messier.objects.galaxy);
    this.buildMaterialForObjects(this._nebulas, theme.messier.objects.nebula);
    this.buildMaterialForObjects(this._other, theme.messier.objects.other);
  }

  private buildMaterialForObjects(objects: Points, style: TextureStyle): void {
    const material = this.buildMaterial(
      style.image,
      style.sizeMultiplier
    );
    objects.material = material;
    material.needsUpdate = true;
  }

  private buildMaterial(textureFile: string, sizeMultiplier: number): Material {
    const textureFileInContext = environment.pathInContext(textureFile);
    return new PointsMaterial({
      size: 5 * sizeMultiplier,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.05,
      map: this._textureLoader.load(textureFileInContext)
    });
  }

  private useThemeForLabels(theme: Theme): void {
    this._labels?.forEach(
      (label: RenderableText) => label.applyStyle(theme.messier.names)
    );
  }

}
