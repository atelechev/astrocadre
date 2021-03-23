import { Layer } from 'src/app/modules2/core/models/layer';
import { RenderableText } from 'src/app/modules2/core/models/layers/renderable-text';
import { Searchable } from 'src/app/modules2/core/models/searchable';
import { Theme } from 'src/app/modules2/core/models/theme';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { Object3D } from 'three';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer {

  private _textsShown: boolean;

  constructor(
    private readonly _model: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
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
   * Returns true if this layer is a parent of the specified layer.
   *
   * @param other the layer to test the relation with.
   *
   * @returns boolean true if this layer is a parent of the one of the argument.
   */
  public isParentOf(other: RenderableLayer): boolean {
    if (!other) {
      return false;
    }
    return this._model
      .subLayers?.find((subLayer: Layer) => subLayer.code === other.code) !== undefined;
  }

  /**
   * Returns true if this layer is a child of the specified layer.
   *
   * @param other the layer to test the relation with.
   *
   * @returns boolean true if this layer is a child of the one of the argument.
   */
  public isChildOf(other: RenderableLayer): boolean {
    return other && other.isParentOf(this);
  }

  /**
   * Returns the code of this layer, used as its identifier.
   *
   * @returns string the code/identifier of this layer.
   */
  protected get code(): string {
    return this._model.code;
  }

  protected get materialsService(): MaterialsService {
    return this._materialsService;
  }

  protected get eventsService(): EventsService {
    return this._eventsService;
  }

  protected subscribeThemeLoaded(): void {
    this.eventsService
      .themeChanged
      .subscribe(
        (theme: Theme) => {
          if (theme) {
            this.applyTheme();
          }
        }
      );
  }

  /**
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  protected abstract applyTheme(): void;

}
