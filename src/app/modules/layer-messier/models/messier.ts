import { Object3D, Points } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { RenderableText } from '#core/models/layers/renderable-text';
import { Searchable } from '#core/models/layers/searchable';
import { Theme } from '#core/models/theme/theme';
import { TextureStyle } from '#core/models/theme/texture-style';
import { buildAndAssignMaterial, buildPointMaterial } from '#core/utils/material-utils';


export class Messier extends RenderableLayer {

  constructor(
    model: Layer,
    private readonly _clusters: Points,
    private readonly _galaxies: Points,
    private readonly _nebulas: Points,
    private readonly _other: Points,
    private readonly _labels: Array<RenderableText>
  ) {
    super(model);
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
    return this.model.objects;
  }

  public applyTheme(theme: Theme): void {
    this.useThemeForObjects(theme);
    this.useThemeForLabels(theme);
  }

  private useThemeForObjects(theme: Theme): void {
    this.buildMaterialForObjects(this._clusters, theme.messier.objects.cluster);
    this.buildMaterialForObjects(this._galaxies, theme.messier.objects.galaxy);
    this.buildMaterialForObjects(this._nebulas, theme.messier.objects.nebula);
    this.buildMaterialForObjects(this._other, theme.messier.objects.other);
  }

  private buildMaterialForObjects(objects: Points, style: TextureStyle): void {
    const dotSize = 5 * style.sizeMultiplier;
    buildAndAssignMaterial(() => buildPointMaterial(style.image, dotSize), objects);
  }

  private useThemeForLabels(theme: Theme): void {
    this._labels?.forEach(
      (label: RenderableText) => label.applyStyle(theme.messier.names)
    );
  }

}
