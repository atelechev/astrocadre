import { Object3D } from 'three';
import { Layer } from '#core/models/layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/searchable';
import { Theme } from '#core/models/theme';
import { ThemeService } from '#core/services/theme.service';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer { // TODO can implement Layer in order to avoid the model field

  private _textsShown: boolean;

  constructor(
    private readonly _model: Layer,
    private readonly _themeService: ThemeService // TODO decouple it from this service
  ) {
    this._textsShown = true;
  }

  /**
   * Returns the model object of this layer.
   *
   * @returns Layer the model object of this layer.
   */
  public get model(): Layer {
    return this._model;
  }

  /**
   * Returns the array of Three.Object3D that should be rendered in the view for this layer.
   */
  public get objects(): Array<Object3D> {
    return [];
  }

  /**
   * Returns the array of RenderableTexts to show for this layer.
   */
  public get texts(): Array<RenderableText> {
    return [];
  }

  public get searchables(): Array<Searchable> {
    return [];
  }

  public get areTextsShown(): boolean {
    return this._textsShown;
  }

  public showTexts(): void {
    this._textsShown = true;
  }

  public hideTexts(): void {
    this._textsShown = false;
  }

  /**
   * Returns the code of this layer, used as its identifier.
   *
   * @returns string the code/identifier of this layer.
   */
  protected get code(): string {
    return this._model.code;
  }

  protected subscribeThemeChanged(): void {
    this._themeService
      .themeChanged
      .subscribe(
        (theme: Theme) => this.applyTheme(theme)
      );
  }

  /**
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  public abstract applyTheme(theme: Theme): void;

}
