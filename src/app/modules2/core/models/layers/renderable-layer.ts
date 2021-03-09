import { Layer } from 'src/app/modules2/core/models/layer';
import { Theme } from 'src/app/modules2/core/models/theme';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { Object3D } from 'three';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer {

  private _textShown: boolean;

  constructor(
    private readonly _model: Layer,
    private readonly _materialsService: MaterialsService,
    private readonly _eventsService: EventsService
  ) {
    this._textShown = true;
    this.subscribeThemeLoaded();
  }

  /**
   * Returns true if the text/labels associated with this layer should be shown.
   */
  public get isTextShown(): boolean {
    return this._textShown;
  }

  /**
   * Sets the visibility of text/labels assiciated with this layer.
   *
   * @param show true to show the labels.
   */
  public set textShown(show: boolean) {
    this._textShown = show;
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
   * Sets this layer visible.
   *
   * @param visible true to show, false to hide this layer.
   */
  public setVisible(visible: boolean): void {
    this.objects.forEach(object => object.visible = visible);
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
   * Returns the array of HTMLElements with text contents to show for this layer.
   */
  public getTextElements(): Array<HTMLElement> {
    return [];
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

  private subscribeThemeLoaded(): void {
    this.eventsService
      .themeLoaded
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
