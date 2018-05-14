import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, Points } from 'three';
import { MergedPoints } from './geometry/merged-points';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';
import { StarsMagnitudeLayer } from './stars-magnitude-layer';
import { ItemsTreeNode } from '../core/items-tree-node';

export class StarsLayer extends RenderableLayer {

  private starsByMagnitudeClasses: Map<number, StarsMagnitudeLayer>;

  private visibleMagnitudesDownTo: number;

  constructor(tree: ItemsTreeNode) {
    super(tree);
    this.starsByMagnitudeClasses = new Map<number, StarsMagnitudeLayer>();
  }

  private getSortedMagnitudeClasses(): Array<number> {
    return Array.from(this.starsByMagnitudeClasses.keys()).sort();
  }

  public addStarMagnitudeLayer(layer: StarsMagnitudeLayer): void {
    this.starsByMagnitudeClasses.set(layer.magClass, layer);
  }

  public getObjects(): Object3D[] {
    return [];
  }

  protected useThemeForThis(theme: Theme): void {
    // nothing
  }

  public getSubLayers(): RenderableLayer[] {
    return Array.from(this.starsByMagnitudeClasses.values());
  }

  private isMagnitudeVisible(magnitude: number): boolean {
    return !this.visibleMagnitudesDownTo || magnitude <= this.visibleMagnitudesDownTo;
  }

  public setVisibleMagnitudesDownTo(magnitude: number): void {
    this.visibleMagnitudesDownTo = magnitude;
    this.starsByMagnitudeClasses.forEach((stars: StarsMagnitudeLayer, magClass: number) => {
      this.setMagnitudeClassVisible(magClass, true);
    });
  }

  private setMagnitudeClassVisible(magClass: number, visible: boolean): void {
    const showThisMagClass = visible && this.isMagnitudeVisible(magClass);
    const stars = this.starsByMagnitudeClasses.get(magClass);
    if (stars) {
      stars.setVisible(showThisMagClass);
    }
  }

  public setVisible(visible: boolean): void {
    this.starsByMagnitudeClasses.forEach((stars: StarsMagnitudeLayer, magClass: number) => {
      this.setMagnitudeClassVisible(magClass, visible);
    });
  }

}
