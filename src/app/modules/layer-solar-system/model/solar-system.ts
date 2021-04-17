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

/**
 * Represents a renderable layer containing the Solar system objects.
 */
export class SolarSystem extends RenderableLayer {

  private readonly _textureLoader: TextureLoader;

  private readonly _indexEcliptic: number;

  private readonly _indexMoonPath: number;

  private readonly _indexSun: number;

  private readonly _indexMoon: number;

  private _objects: Array<Object3D>;

  constructor(model: Layer,) {
    super(model);
    this._indexEcliptic = 0;
    this._indexMoonPath = 1;
    this._indexSun = 2;
    this._indexMoon = 3;
    this._textureLoader = new TextureLoader();
    this._objects = [];
  }

  public set sun(sun: Points) {
    this._objects[this._indexSun] = sun;
  }

  public get sun(): Points {
    return this._objects[this._indexSun] as Points;
  }

  public set ecliptic(ecliptic: LineSegments) {
    this._objects[this._indexEcliptic] = ecliptic;
  }

  public get ecliptic(): LineSegments {
    return this._objects[this._indexEcliptic] as LineSegments;
  }

  public set moon(moon: Points) {
    this._objects[this._indexMoon] = moon;
  }

  public get moon(): Points {
    return this._objects[this._indexMoon] as Points;
  }

  public set moonPath(path: LineSegments) {
    this._objects[this._indexMoonPath] = path;
  }

  public get moonPath(): LineSegments {
    return this._objects[this._indexMoonPath] as LineSegments;
  }

  public get objects(): Array<Object3D> {
    return this._objects.filter((obj: any) => !!obj);
  }

  public applyTheme(theme: Theme): void {
    // TODO
    if (this.hasEcliptic()) {
      this.applyLineStyle(theme.solarSystem.sun.ecliptic, this.ecliptic);
    }
    if (this.hasMoonPath()) {
      this.applyLineStyle(theme.solarSystem.moon.path, this.moonPath);
    }
    if (this.hasSun()) {
      this.applyTextureMaterial(theme.solarSystem.sun.texture, this.sun);
    }
    if (this.hasMoon()) {
      this.applyTextureMaterial(theme.solarSystem.moon.texture, this.moon);
    }
  }

  private hasObject(index: number): boolean {
    return this._objects.length > 0 && !!this._objects[index];
  }

  private hasEcliptic(): boolean {
    return this.hasObject(this._indexEcliptic);
  }

  private hasMoonPath(): boolean {
    return this.hasObject(this._indexMoonPath);
  }

  private hasSun(): boolean {
    return this.hasObject(this._indexSun);
  }

  private hasMoon(): boolean {
    return this.hasObject(this._indexMoon);
  }

  private applyLineStyle(style: LineStyle, object: LineSegments): void {
    const material = buildLineMaterial(style);
    object.material = material;
    material.needsUpdate = true;
  }

  private applyTextureMaterial(style: TextureStyle, object: Points): void {
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

}
