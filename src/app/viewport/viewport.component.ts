import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { SceneManager } from './scene-manager';
import { Theme } from '../core/theme/theme';
import { ThemeAware } from '../core/theme/theme-aware';
import { Object3D } from 'three';
import { RenderableText } from '../core/layer/label/renderable-text';
import { LabelsVisibilityManager } from './labels-visibility-manager';
import { ViewportDimensionService } from './viewport-dimension.service';
import { MouseEventsHandler } from './mouse-events-handler';

@Component({
  selector: `app-sky-view-viewport`,
  templateUrl: './viewport.component.html',
  styleUrls: [ './viewport.component.css' ],
  providers: [
    ViewportDimensionService,
    SceneManager,
    WorldOriginCameraService,
    LabelsVisibilityManager,
    MouseEventsHandler
  ]
})
export class ViewportComponent implements AfterViewInit, ThemeAware {

  @ViewChild('skyViewViewport')
  private skyViewViewport: ElementRef;

  private viewportWidth: string;

  private viewportHeight: string;

  constructor(private dimensionService: ViewportDimensionService,
              private sceneManager: SceneManager,
              private cameraService: WorldOriginCameraService,
              private labelsManager: LabelsVisibilityManager,
              private mouseEventHandler: MouseEventsHandler) {
    this.viewportWidth = this.dimensionService.getWidth() + 'px';
    this.viewportHeight = this.dimensionService.getHeight() + 'px';
    this.cameraService.initCoordsMarkerObject();
  }

  private appendCanvas(): void {
    const canvas = this.sceneManager.getDomElement();
    this.skyViewViewport.nativeElement.appendChild(canvas);
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this.sceneManager.render();
    this.mouseEventHandler.initMouseListenersOn(this.skyViewViewport.nativeElement);
  }

  public useTheme(theme: Theme): void {
    this.sceneManager.updateForTheme(theme);
  }

  public addObjects(objects: Object3D[]): void {
    this.sceneManager.addObjects(objects);
  }

  public addTextElements(htmlElements: HTMLElement[]): void {
    const nativeWrapper = this.skyViewViewport.nativeElement;
    htmlElements.forEach(htmlElement => {
      nativeWrapper.appendChild(htmlElement);
    });
  }

  public hideLabelsByLayer(layer: string): void {
    this.labelsManager.hideLabelsByLayer(layer, this.skyViewViewport.nativeElement);
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.labelsManager.showVisibleLabels(layer, labels, this.skyViewViewport.nativeElement);
  }

}
