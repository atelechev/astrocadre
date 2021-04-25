import { LineSegments, Object3D } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { buildAndAssignMaterial, buildLineMaterial } from '#core/utils/material-utils';

/**
 * Represents a renderable layer containing the constellations.
 */
export class Constellations extends RenderableLayer {

  public static readonly CODE = 'constellations';

  private readonly _objects: Array<Object3D>;

  private readonly _searchables: Array<Searchable>;

  constructor(
    model: Layer,
    private readonly _boundaries: LineSegments,
    private readonly _lines: LineSegments,
    private readonly _texts: Array<RenderableText>
  ) {
    super(model);
    this._searchables = model.objects[0].names;
    this._objects = [
      this._boundaries,
      this._lines
    ];
  }

  public get objects(): Object3D[] {
    return this._objects;
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public applyTheme(theme: Theme): void {
    const style = theme.constellation;
    buildAndAssignMaterial(() => buildLineMaterial(style.boundaries), this._boundaries);
    buildAndAssignMaterial(() => buildLineMaterial(style.lines), this._lines);
    this._texts.forEach(
      (renderable: RenderableText) => renderable.applyStyle(style.names)
    );
  }

  public showBoundaries(show: boolean): void {
    this.showObject(show, this._boundaries);
  }

  public showLines(show: boolean): void {
    this.showObject(show, this._lines);
  }

  private showObject(show: boolean, object: Object3D): void {
    const indexObject = this._objects.findIndex(
      (obj: Object3D) => obj === object
    );
    if (show && indexObject === -1) {
      this._objects.push(object);
    }
    if (!show && indexObject > -1) {
      this._objects.splice(indexObject, 1);
    }
  }

}
