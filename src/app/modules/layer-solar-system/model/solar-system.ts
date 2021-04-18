import {
  LineSegments,
  Object3D,
  Points,
  PointsMaterial,
  TextureLoader
  } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { LineStyle } from '#core/models/theme/line-style';
import { buildLineMaterial } from '#core/utils/material-utils';
import { TextureStyle } from '#core/models/theme/texture-style';
import { environment } from '#environments/environment';
import { Searchable } from '#core/models/layers/searchable';
import { RenderableText } from '#core/models/layers/renderable-text';
import { TextStyle } from '#core/models/theme/text-style';

/**
 * Represents a renderable layer containing the Solar system objects.
 */
export class SolarSystem extends RenderableLayer {

  private readonly _textureLoader: TextureLoader;

  private readonly _objects: Array<Object3D>;

  private readonly _texts: Array<RenderableText>;

  private readonly _searchables: Array<Searchable>;

  constructor(model: Layer,) {
    super(model);
    this._textureLoader = new TextureLoader();
    this._objects = [];
    this._texts = [];
    this._searchables = [];
  }

  public set sun(sun: Points) {
    this._objects[2] = sun;
  }

  public get sun(): Points {
    return this._objects[2] as Points;
  }

  public set ecliptic(ecliptic: LineSegments) {
    this._objects[0] = ecliptic;
  }

  public get ecliptic(): LineSegments {
    return this._objects[0] as LineSegments;
  }

  public set moon(moon: Points) {
    this._objects[3] = moon;
  }

  public get moon(): Points {
    return this._objects[3] as Points;
  }

  public set moonPath(path: LineSegments) {
    this._objects[1] = path;
  }

  public get moonPath(): LineSegments {
    return this._objects[1] as LineSegments;
  }

  public get objects(): Array<Object3D> {
    return this._objects.filter((obj: any) => !!obj);
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public addText(text: RenderableText): void {
    if (text) {
      this._texts.push(text);
    }
  }

  public addSeachable(searchable: Searchable): void {
    if (searchable) {
      this._searchables.push(searchable);
    }
  }

  public applyTheme(theme: Theme): void {
    this.applyLineStyle(theme.solarSystem.sun.ecliptic, this.ecliptic);
    this.applyLineStyle(theme.solarSystem.moon.path, this.moonPath);
    this.applyTextureMaterial(theme.solarSystem.sun.texture, this.sun);
    this.applyTextureMaterial(theme.solarSystem.moon.texture, this.moon);
    this.applyTextStyle(theme.solarSystem.names);
  }

  private applyLineStyle(style: LineStyle, object: LineSegments): void {
    if (!object) {
      return;
    }
    const material = buildLineMaterial(style);
    object.material = material;
    material.needsUpdate = true;
  }

  private applyTextureMaterial(style: TextureStyle, object: Points): void {
    if (!object) {
      return;
    }
    const material = this.buildTextureMaterial(style);
    object.material = material;
    material.needsUpdate = true;
  }

  private buildTextureMaterial(style: TextureStyle): PointsMaterial {
    const dotSize = 6.5 * style.sizeMultiplier;
    const textureFileInContext = environment.pathInContext(style.image);
    return new PointsMaterial({
      size: dotSize,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.05,
      map: this._textureLoader.load(textureFileInContext)
    });
  }

  private applyTextStyle(style: TextStyle): void {
    this._texts.forEach(
      (text: RenderableText) => text.applyStyle(style)
    );
  }

}
