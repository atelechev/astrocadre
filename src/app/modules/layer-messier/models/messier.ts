import { Object3D, Points } from 'three';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { TextureStyle } from '#core/models/theme/texture-style';
import { buildAndAssignMaterial, buildPointMaterial } from '#core/utils/material-utils';
import { MessierStyle } from '#layer-messier/models/theme/messier-style';


export class Messier extends RenderableLayer {

  public static readonly CODE = 'messier';

  constructor(
    private readonly _clusters: Points,
    private readonly _galaxies: Points,
    private readonly _nebulas: Points,
    private readonly _other: Points,
    private readonly _searchables: Array<Searchable>,
    private readonly _labels: Array<RenderableText>
  ) {
    super(
      Messier.CODE,
      [],
      'Messier objects',
      'Celestial objects from the Messier catalog'
    );
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
    return this._searchables;
  }

  public applyTheme(theme: Theme): void {
    const style = this.extractStyle(theme) as MessierStyle;
    this.useThemeForObjects(style);
    this.useThemeForLabels(style);
  }

  private useThemeForObjects(style: MessierStyle): void {
    this.buildMaterialForObjects(this._clusters, style.objects.cluster);
    this.buildMaterialForObjects(this._galaxies, style.objects.galaxy);
    this.buildMaterialForObjects(this._nebulas, style.objects.nebula);
    this.buildMaterialForObjects(this._other, style.objects.other);
  }

  private buildMaterialForObjects(objects: Points, style: TextureStyle): void {
    const dotSize = 5 * style.sizeMultiplier;
    buildAndAssignMaterial(() => buildPointMaterial(style.image, dotSize), objects);
  }

  private useThemeForLabels(style: MessierStyle): void {
    this._labels.forEach(
      (label: RenderableText) => label.applyStyle(style.names)
    );
  }

}
