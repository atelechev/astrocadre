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
import { TextStyle } from '#core/models/theme/text-style';
import { environment } from '#environments/environment';


export class Stars extends RenderableLayer {

  private readonly _textureLoader: TextureLoader;

  private _properNamesShown: boolean;

  constructor(
    model: Layer,
    private readonly _magClass: number,
    private readonly _stars: Points,
    private readonly _properNames: Array<RenderableText>,
    private readonly _standardNames: Array<RenderableText>,
    private readonly _searchables: Array<Searchable>
  ) {
    super(model);
    this._textureLoader = new TextureLoader();
    this.showProperNames();
  }

  public get magnitudeClass(): number {
    return this._magClass;
  }

  public get objects(): Array<Object3D> {
    return [this._stars];
  }

  public get texts(): Array<RenderableText> {
    return this._properNamesShown ? this._properNames : this._standardNames;
  }

  public get properNamesShown(): boolean {
    return this._properNamesShown;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public showProperNames(): void {
    this._properNamesShown = true;
  }

  public showStandardNames(): void {
    this._properNamesShown = false;
  }

  public applyTheme(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  private useThemeForObjects(theme: Theme): void {
    const material = this.buildMaterial(
      theme.stars.texture.image,
      theme.stars.texture.sizeMultiplier
    );
    this._stars.material = material;
    material.needsUpdate = true;
  }

  private buildMaterial(textureFile: string, sizeMultiplier: number): Material {
    const dotSize = (6.5 - this._magClass) * sizeMultiplier;
    const textureFileInContext = environment.pathInContext(textureFile);
    return new PointsMaterial({
      size: dotSize,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.05,
      map: this._textureLoader.load(textureFileInContext)
    });
  }

  private useThemeForLabels(theme: Theme): void {
    this.applyTextStyleOn(this._properNames, theme.stars.names.proper);
    this.applyTextStyleOn(this._standardNames, theme.stars.names.standard);
  }

  private applyTextStyleOn(labels: Array<RenderableText>, style: TextStyle): void {
    labels?.forEach(
      (label: RenderableText) => label.applyStyle(style)
    );
  }

}
