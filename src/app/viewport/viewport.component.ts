import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { SceneManager } from './scene-manager';
import { Theme } from '../core/theme/theme';
import { ThemeAware } from '../core/theme/theme-aware';
import { Object3D } from 'three';
import { RenderableText } from '../core/layer/label/renderable-text';
import { LabelsVisibilityManager } from './labels-visibility-manager';
import { MouseEventsHandler } from './mouse-events-handler';
import { ViewportDimensionService } from '../core/viewport/viewport-dimension.service';

@Component({
  selector: `app-astrocadre-viewport`,
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css'],
  providers: [
    SceneManager,
    WorldOriginCameraService,
    LabelsVisibilityManager,
    MouseEventsHandler
  ]
})
export class ViewportComponent implements AfterViewInit, ThemeAware {

  @ViewChild('astrocadreViewport')
  private astrocadreViewport: ElementRef;

  public viewportWidth: string;

  public viewportHeight: string;

  constructor(private dimensionService: ViewportDimensionService,
    private sceneManager: SceneManager,
    private cameraService: WorldOriginCameraService,
    private labelsManager: LabelsVisibilityManager,
    private mouseEventHandler: MouseEventsHandler) {
    this.updateViewportDimension();
    this.subscribeViewportDimensionChangeEvent();
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this.sceneManager.render();
    this.mouseEventHandler.initMouseListenersOn(this.astrocadreViewport.nativeElement);
  }

  public useTheme(theme: Theme): void {
    this.sceneManager.updateForTheme(theme);
  }

  public addObjects(objects: Object3D[]): void {
    this.sceneManager.addObjects(objects);
  }

  public addTextElements(htmlElements: HTMLElement[]): void {
    const nativeWrapper = this.astrocadreViewport.nativeElement;
    htmlElements.forEach(htmlElement => {
      nativeWrapper.appendChild(htmlElement);
    });
  }

  public hideLabelsByLayer(layer: string): void {
    this.labelsManager.hideLabelsByLayer(layer, this.astrocadreViewport.nativeElement);
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.labelsManager.showVisibleLabels(layer, labels, this.astrocadreViewport.nativeElement);
  }

  private subscribeViewportDimensionChangeEvent(): void {
    this.dimensionService.broadcastDimensionChanged$.subscribe(
      () => this.updateViewportDimension()
    );
  }

  private updateViewportDimension(): void {
    this.viewportWidth = this.dimensionService.getWidth() + 'px';
    this.viewportHeight = this.dimensionService.getHeight() + 'px';
  }

  private appendCanvas(): void {
    const canvas = this.sceneManager.getDomElement();
    this.astrocadreViewport.nativeElement.appendChild(canvas);
  }

}
