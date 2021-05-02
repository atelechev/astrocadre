import { Object3D } from 'three';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { LayerStyle } from '#core/models/theme/layer-style';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer {

  constructor(
    private readonly _code: string,
    private readonly _subLayers: Array<string>,
    private readonly _label: string,
    private readonly _description?: string
  ) {

  }

  /**
   * Returns the code of this layer, used as its identifier.
   *
   * @returns string the code/identifier of this layer.
   */
  public get code(): string {
    return this._code;
  }

  /**
   * Returns the array of Three.Object3D that should be rendered in the view for this layer.
   */
  public get objects(): Array<Object3D> {
    return [];
  }

  /**
   * Returns the label of this layer.
   *
   * @returns string the label of this layer.
   */
  public get label(): string {
    return this._label;
  }

  /**
   * Returns the description of this layer.
   *
   * @returns string the description of this layer.
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Returns the array of codes of the sub-layers of this layer.
   */
  public get subLayers(): Array<string> {
    return this._subLayers;
  }

  /**
   * Returns the array of RenderableTexts to show for this layer.
   */
  public get texts(): Array<RenderableText> {
    return [];
  }

  /**
   * Returns the array of searchable objects belonging to this layer.
   */
  public get searchables(): Array<Searchable> {
    return [];
  }

  /**
   * Returns the LayerStyle object defined in the specified theme and
   * corresponding to this layer.
   *
   * @param theme the theme to extract the style from.
   * @returns LayerStyle the style definition or undefined if it was not found.
   */
  public extractStyle(theme: Theme): LayerStyle {
    if (!theme) {
      return undefined;
    }
    return theme.layers.find(
      (style: LayerStyle) => this.isStyleMatching(style)
    );
  }

  protected isStyleMatching(style: LayerStyle): boolean {
    return style.code === this.code;
  }

  /**
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  public abstract applyTheme(theme: Theme): void;

}
