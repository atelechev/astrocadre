import {
  LineSegments,
  Object3D,
  Points,
  PointsMaterial
  } from 'three';
import { Layer } from '#core/models/layers/layer';
import { RenderableLayer } from '#core/models/layers/renderable-layer';
import { Theme } from '#core/models/theme/theme';
import { LineStyle } from '#core/models/theme/line-style';
import { buildAndAssignMaterial, buildLineMaterial, buildPointMaterial } from '#core/utils/material-utils';
import { TextureStyle } from '#core/models/theme/texture-style';
import { Searchable } from '#core/models/layers/searchable';
import { RenderableText } from '#core/models/layers/renderable-text';
import { TextStyle } from '#core/models/theme/text-style';

/**
 * Represents a renderable layer containing the Solar system objects.
 */
export class SolarSystem extends RenderableLayer {

  private readonly _objects: Array<Object3D>;

  private readonly _texts: Array<RenderableText>;

  private readonly _searchables: Array<Searchable>;

  private readonly _celestialBodies: Map<string, Points>;

  private readonly _trajectories: Map<string, LineSegments>;

  constructor(model: Layer) {
    super(model);
    this._objects = [];
    this._texts = [];
    this._searchables = [];
    this._celestialBodies = new Map<string, Points>();
    this._trajectories = new Map<string, LineSegments>();
  }

  public get objects(): Array<Object3D> {
    return this._objects;
  }

  public get texts(): Array<RenderableText> {
    return this._texts;
  }

  public get searchables(): Array<Searchable> {
    return this._searchables;
  }

  public getTrajectory(name: string): LineSegments {
    return this._trajectories.get(name);
  }

  public getCelestialBody(name: string): Points {
    return this._celestialBodies.get(name);
  }

  public addCelestialBody(name: string, body: Points): void {
    if (name && body) {
      this._celestialBodies.set(name.toLowerCase(), body);
      this._objects.push(body);
    }
  }

  public addTrajectory(name: string, trajectory: LineSegments): void {
    if (name && trajectory) {
      this._trajectories.set(name.toLowerCase(), trajectory);
      this._objects.push(trajectory);
    }
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
    this.applyThemeOnTrajectories(theme);
    this.applyThemeOnCelestialBodies(theme);
    this.applyTextStyle(theme.solarSystem.names);
  }

  // TODO use a single showTrajectories(boolean) method
  public hideTrajectories(): void {
    this._trajectories.forEach(
      (trajectory: Object3D) => {
        const index = this.getTrajectoryIndex(trajectory);
        if (index > -1) {
          this._objects.splice(index, 1);
        }
      }
    );
  }

  public showTrajectories(): void {
    this._trajectories.forEach(
      (trajectory: Object3D) => {
        const index = this.getTrajectoryIndex(trajectory);
        if (index === -1) {
          this._objects.push(trajectory);
        }
      }
    );
  }

  private applyThemeOnTrajectories(theme: Theme): void {
    this._trajectories.forEach(
      (trajectory: LineSegments, name: string) => {
        const style = this.extractPathStyle(theme, name);
        this.applyLineStyle(style, trajectory);
      }
    );
  }

  private extractPathStyle(theme: Theme, body: string): LineStyle {
    const defaultStyle = theme.solarSystem.baseStyle.path;
    const pathStyle = theme.solarSystem[body]?.path as LineStyle;
    const merged = Object.assign({}, defaultStyle);
    return Object.assign(merged, pathStyle);
  }

  private applyThemeOnCelestialBodies(theme: Theme): void {
    this._celestialBodies.forEach(
      (body: Points, name: string) => {
        const style = this.extractCelestialBodyStyle(theme, name);
        this.applyTextureMaterial(style, body);
      }
    );
  }

  private extractCelestialBodyStyle(theme: Theme, body: string): TextureStyle {
    const defaultStyle = theme.solarSystem.baseStyle.texture;
    const bodyStyle = theme.solarSystem[body]?.texture as TextureStyle;
    const merged = Object.assign({}, defaultStyle);
    return Object.assign(merged, bodyStyle);
  }

  private getTrajectoryIndex(trajectory: Object3D): number {
    return this._objects.findIndex(
      (obj: Object3D) => obj === trajectory
    );
  }

  private applyLineStyle(style: LineStyle, object: LineSegments): void {
    buildAndAssignMaterial(() => buildLineMaterial(style), object);
  }

  private applyTextureMaterial(style: TextureStyle, object: Points): void {
    buildAndAssignMaterial(() => this.buildTextureMaterial(style), object);
  }

  private buildTextureMaterial(style: TextureStyle): PointsMaterial {
    const dotSize = 6.5 * style.sizeMultiplier;
    return buildPointMaterial(style.image, dotSize);
  }

  private applyTextStyle(style: TextStyle): void {
    this._texts.forEach(
      (text: RenderableText) => text.applyStyle(style)
    );
  }

}
