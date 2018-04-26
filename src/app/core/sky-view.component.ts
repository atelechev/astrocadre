import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SceneService } from './scene.service';
import { SkyGridComponent } from '../layers/sky-grid.component';
import { RenderableLayer } from './renderable-layer';
import { ConstellationBoundariesComponent } from '../layers/constellation-boundaries.component';
import { Object3D } from 'three';
import { RendererService } from './renderer.service';
import { WorldOriginCameraService } from './world-origin-camera.service';
import { ExternalCameraService } from './external-camera.service'; // TODO for dev only
import { ConstellationLinesComponent } from '../layers/constellation-lines.component';
import { StarsComponent } from '../layers/stars.component';
import { ThemesComponent } from '../themes/themes.component';
import { Themes } from '../themes/themes';
import { Theme } from '../themes/theme';
import { Constants } from '../constants';
import { SelectableItem } from './selectable-item';

@Component({
  selector: 'app-sky-view',
  templateUrl: './sky-view.component.html',
  styleUrls: ['./sky-view.component.css'],
  providers: [
    SceneService,
    WorldOriginCameraService,
    ExternalCameraService, // TODO ExternalCameraService for dev only
    RendererService ]
})
export class SkyViewComponent implements AfterViewInit {

  @ViewChild('skyViewViewport')
  private skyViewViewport: ElementRef;

  private viewportWidth: string;

  private viewportHeight: string;

  private layers: RenderableLayer[];

  constructor(private themesComponent: ThemesComponent,
              private sceneService: SceneService,
              private rendererService: RendererService,
              private cameraService: WorldOriginCameraService,
              private skyGrid: SkyGridComponent,
              private constellationBoundaries: ConstellationBoundariesComponent,
              private constellationLines: ConstellationLinesComponent,
              private stars: StarsComponent) {
    this.viewportWidth = Constants.VIEW_WIDTH + 'px';
    this.viewportHeight = Constants.VIEW_HEIGHT + 'px';
    this.layers = new Array<RenderableLayer>(
      skyGrid,
      constellationBoundaries,
      constellationLines,
      stars
    );
  }

  private appendCanvas(): void {
    const canvas = this.rendererService.getDomElement();
    this.skyViewViewport.nativeElement.appendChild(canvas);
  }

  ngAfterViewInit() {
    this.appendCanvas();
    this.rendererService.render(this.sceneService.getScene(), this.cameraService.getCamera());
    this.cameraService.initMouseListeners(this.rendererService, this.sceneService);
  }

  private isLayerVisible(layerCode: string, availableLayers: Array<SelectableItem>): boolean {
    const layer = availableLayers.find(availableLayer => availableLayer.code === layerCode);
    if (layer) {
      return layer.selected;
    }
    return false;
  }

  public loadTheme(themeCode: string, availableLayers: Array<SelectableItem>): void {
    this.themesComponent.loadTheme(<Themes> themeCode).subscribe(
      (theme: Theme) => {
        this.sceneService.clearScene();
        this.sceneService.updateForTheme(theme);
        this.layers.forEach(layer => {
          layer.getObjects(this.themesComponent.getActiveTheme()).subscribe(
            (objects: Object3D[]) => {
              console.log(`${objects.length} objects to add for layer ${layer.getName()}`);
              this.sceneService.addLayer(layer.getName(), objects);
              if (this.isLayerVisible(layer.getName(), availableLayers)) {
                this.sceneService.showLayer(layer.getName(), true);
              }
            },
            (error) => console.error(`Failed to load the layer '${layer.getName()}': ${error}`)
          );
        });
      },
      (error) => console.error(`Failed to initialize sky-view': ${error}`)
    );
  }

  public showLayer(layerCode: string, visible: boolean): void {
    this.sceneService.showLayer(layerCode, visible);
  }

}
