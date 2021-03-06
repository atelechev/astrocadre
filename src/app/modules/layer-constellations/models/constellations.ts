import { LineSegments, Object3D } from 'three';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { buildAndAssignMaterial, buildLineMaterial } from '#core/utils/material-utils';
import { ConstellationsStyle } from '#layer-constellations/models/theme/constellations-style';

/**
 * Represents a renderable layer containing the constellations.
 */
export class Constellations extends RenderableLayer {

  public static readonly CODE = 'constellations';

  private readonly _objects: Array<Object3D>;

  constructor(
    private readonly _boundaries: LineSegments,
    private readonly _lines: LineSegments,
    private readonly _searchables: Array<Searchable>,
    private readonly _texts: Array<RenderableText>
  ) {
    super(
      Constellations.CODE,
      [],
      'Constellations',
      'Constellations: boundaries, lines and names'
    );
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
    const style = this.extractStyle(theme) as ConstellationsStyle;
    buildAndAssignMaterial(() => buildLineMaterial(style.boundaries), this._boundaries);
    buildAndAssignMaterial(() => buildLineMaterial(style.lines), this._lines);
    this._texts.forEach(
      (renderable: RenderableText) => renderable.applyStyle(style.names)
    );
  }

  public setBoundariesVisible(visible: boolean): void {
    this.setObjectVisible(visible, this._boundaries);
  }

  public setLinesVisible(visible: boolean): void {
    this.setObjectVisible(visible, this._lines);
  }

  private setObjectVisible(visible: boolean, object: Object3D): void {
    const indexObject = this._objects.findIndex(
      (obj: Object3D) => obj === object
    );
    if (visible && indexObject === -1) {
      this._objects.push(object);
    }
    if (!visible && indexObject > -1) {
      this._objects.splice(indexObject, 1);
    }
  }

}
