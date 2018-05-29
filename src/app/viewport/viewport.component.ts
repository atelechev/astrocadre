import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Constants } from '../core/constants';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { Theme } from '../core/theme/theme';
import { ThemeAware } from '../core/theme/theme-aware';
import { Object3D } from 'three';
import { RenderableText } from '../core/layer/label/renderable-text';
import { LabelsVisibilityManager } from './labels-visibility-manager';

@Component({
  selector: `app-sky-view-viewport`,
  templateUrl: './viewport.component.html',
  styleUrls: [ './viewport.component.css' ],
  providers: [
    SceneService,
    WorldOriginCameraService,
    RendererService
  ]
})
export class ViewportComponent implements AfterViewInit, ThemeAware {

  @ViewChild('skyViewViewport')
  private skyViewViewport: ElementRef;

  private viewportWidth: string;

  private viewportHeight: string;

  private labelsVisibilityManager: LabelsVisibilityManager;

  constructor(private rendererService: RendererService,
              private sceneService: SceneService,
              private cameraService: WorldOriginCameraService) {
    this.viewportWidth = Constants.VIEW_WIDTH + 'px';
    this.viewportHeight = Constants.VIEW_HEIGHT + 'px';
    this.cameraService.initCoordsMarkerObject();
  }

  private appendCanvas(): void {
    const canvas = this.rendererService.getDomElement();
    this.skyViewViewport.nativeElement.appendChild(canvas);
  }

  public ngAfterViewInit(): void {
    this.appendCanvas();
    this.labelsVisibilityManager = new LabelsVisibilityManager(this.skyViewViewport, this.cameraService.getCamera());
    this.rendererService.render(this.sceneService.getScene(), this.cameraService.getCamera());
    this.cameraService.initMouseListeners(this.rendererService, this.sceneService);
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
    this.labelsVisibilityManager.hideLabelsByLayer(layer);
  }

  public showVisibleLabels(layer: string, labels: Map<string, RenderableText>): void {
    this.labelsVisibilityManager.showVisibleLabels(layer, labels);
  }

}
