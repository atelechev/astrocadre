import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { SceneService } from './scene.service';
import { Theme } from '../core/theme/theme';
import { ThemeAware } from '../core/theme/theme-aware';
import { Object3D } from 'three';
import { RenderableText } from '../core/layer/label/renderable-text';
import { LabelsVisibilityManager } from './labels-visibility-manager';
import { ViewportDimensionService } from './viewport-dimension.service';

@Component({
  selector: `app-sky-view-viewport`,
  templateUrl: './viewport.component.html',
  styleUrls: [ './viewport.component.css' ],
  providers: [
    ViewportDimensionService,
    SceneService,
    WorldOriginCameraService,
    LabelsVisibilityManager
  ]
})
export class ViewportComponent implements AfterViewInit, ThemeAware {

  @ViewChild('skyViewViewport')
  private skyViewViewport: ElementRef;

  private viewportWidth: string;

  private viewportHeight: string;

  constructor(private dimensionService: ViewportDimensionService,
              private sceneService: SceneService,
              private cameraService: WorldOriginCameraService,
              private labelsVisibilityManager: LabelsVisibilityManager) {
    this.viewportWidth = this.dimensionService.getWidth() + 'px';
    this.viewportHeight = this.dimensionService.getHeight() + 'px';
    this.cameraService.initCoordsMarkerObject();
  }

  private appendCanvas(): void {
    const canvas = this.sceneService.getDomElement();
    this.skyViewViewport.nativeElement.appendChild(canvas);
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this.sceneService.render(this.cameraService.getCamera());
    this.cameraService.initMouseListeners(this.sceneService);
  }

  public useTheme(theme: Theme): void {
    this.sceneService.updateForTheme(theme);
  }

  public addObjects(objects: Object3D[]): void {
    this.sceneService.addObjects(objects);
  }

  public addTextElements(htmlElements: HTMLElement[]): void {
    const nativeWrapper = this.skyViewViewport.nativeElement;
    htmlElements.forEach(htmlElement => {
      nativeWrapper.appendChild(htmlElement);
    });
  }

  public hideLabelsByLayer(layer: string): void {
    this.labelsVisibilityManager.hideLabelsByLayer(layer, this.skyViewViewport.nativeElement);
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.labelsVisibilityManager.showVisibleLabels(layer, labels, this.skyViewViewport.nativeElement);
  }

}
