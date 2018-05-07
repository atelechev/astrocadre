import { RenderableLayer } from '../core/renderable-layer';
import { Object3D, Points } from 'three';
import { MergedPoints } from './geometry/merged-points';
import { Layers } from '../core/layers';
import { Theme } from '../core/theme';
import { Constants } from '../core/constants';

export class StarsLayer extends RenderableLayer {

  private starsByMagnitudeClasses: Map<number, Points>;

  private objects: Array<Object3D>;

  private visibleMagnitudesDownTo: number;

  constructor(starsByClasses: Map<number, number[][]>) {
    super();
    this.starsByMagnitudeClasses = this.initStarsByMagnitudeMap(starsByClasses);
    this.objects = this.initObjectsArray();
  }

  private initObjectsArray(): Array<Object3D> {
    const magnitudes = this.getSortedMagnitudeClasses();
    const asObjects3D = new Array<Object3D>();
    magnitudes.forEach(magnitude => asObjects3D.push(this.starsByMagnitudeClasses.get(magnitude)));
    return asObjects3D;
  }

  private getSortedMagnitudeClasses(): Array<number> {
    return Array.from(this.starsByMagnitudeClasses.keys()).sort();
  }

  private initStarsByMagnitudeMap(starsByClasses: Map<number, number[][]>): Map<number, Points> {
    const classified = new Map<number, Points>();
    starsByClasses.forEach((stars: number[][], magClass: number) => {
      const object = new MergedPoints(stars, Constants.WORLD_RADIUS - 0.04).toObject3D();
      classified.set(magClass, object);
    });
    return classified;
  }

  public getObjects(): Object3D[] {
    return this.objects;
  }

  public getName(): string {
    return 'stars';
  }

  public useTheme(theme: Theme): void {
    const magnitudes = this.getSortedMagnitudeClasses();
    magnitudes.forEach(magClass => {
      const materialKey = 'star-' + magClass.toFixed(1);
      const material = theme.getMaterialForLayer(Layers.stars, materialKey);
      this.starsByMagnitudeClasses.get(magClass).material = material;
      material.needsUpdate = true;
    });
  }

  private isMagnitudeVisible(magnitude: number): boolean {
    return !this.visibleMagnitudesDownTo || magnitude <= this.visibleMagnitudesDownTo;
  }

  public setVisibleMagnitudesDownTo(magnitude: number): void {
    this.visibleMagnitudesDownTo = magnitude;
    this.starsByMagnitudeClasses.forEach((stars: Points, magClass: number) => {
      this.setMagnitudeClassVisible(magClass, true);
    });
  }

  private setMagnitudeClassVisible(magClass: number, visible: boolean): void {
    const showThisMagClass = visible && this.isMagnitudeVisible(magClass);
    const stars = this.starsByMagnitudeClasses.get(magClass);
    if (stars) {
      stars.visible = showThisMagClass;
    }
  }

  public setVisible(visible: boolean): void {
    this.starsByMagnitudeClasses.forEach((stars: Points, magClass: number) => {
      this.setMagnitudeClassVisible(magClass, visible);
    });
  }

}
