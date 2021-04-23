import { Material, Object3D, Points } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { TextStyle } from '#core/models/theme/text-style';
import { TextureStyle } from '#core/models/theme/texture-style';
import { buildAndAssignMaterial, buildPointMaterial } from '#core/utils/material-utils';

/**
 * Represents a renderable layer containing stars.
 */
export class Stars extends RenderableLayer {

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
    this.showProperNames();
  }

  /**
   * Returns the magnitude of the stars of this layer.
   */
  public get magnitudeClass(): number {
    return this._magClass;
  }

  public get objects(): Array<Object3D> {
    return [this._stars];
  }

  public get texts(): Array<RenderableText> {
    return this._properNamesShown ? this._properNames : this._standardNames;
  }

  /**
   * Returns true if the proper names should be shown.
   *
   * Returns false if the standard names should be shown.
   */
  public get properNamesShown(): boolean {
    return this._properNamesShown;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  /**
   * Sets the proper names of the stars to be shown.
   */
  public showProperNames(): void {
    this._properNamesShown = true;
  }

  /**
   * Sets the standard names of the stars to be shown.
   */
  public showStandardNames(): void {
    this._properNamesShown = false;
  }

  public applyTheme(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  private useThemeForObjects(theme: Theme): void {
    buildAndAssignMaterial(() => this.buildMaterial(theme.stars.texture), this._stars);
  }

  private buildMaterial(texture: TextureStyle): Material {
    const dotSize = (6.5 - this._magClass) * texture.sizeMultiplier;
    return buildPointMaterial(texture.image, dotSize);
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
