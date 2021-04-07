import { Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer implements Layer {

  constructor(private readonly _model: Layer) {

  }

  /**
   * Returns the code of this layer, used as its identifier.
   *
   * @returns string the code/identifier of this layer.
   */
  public get code(): string {
    return this._model.code;
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
    return this._model.label;
  }

  /**
   * Returns true if the objects of this layer are loaded from a separate resource URL.
   */
  public get loadFromUrl(): boolean {
    return this._model.loadFromUrl;
  }

  /**
   * Returns the description of this layer.
   *
   * @returns string the description of this layer.
   */
  public get description(): string {
    return this._model.description;
  }

  /**
   * Returns the array of models of the sub-layers of this layer.
   */
  public get subLayers(): Array<Layer> {
    return this._model.subLayers || [];
  }

  /**
   * Returns the original model object of this layer.
   */
  public get model(): Layer {
    return this._model;
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
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  public abstract applyTheme(theme: Theme): void;

}
