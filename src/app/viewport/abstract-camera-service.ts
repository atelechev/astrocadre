import { Camera, Math as ThreeMath, PerspectiveCamera, Object3D, Vector3 } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { OnInit } from '@angular/core';
import { Constants } from '../core/constants';
import { ViewportEventService } from './viewport-event.service';
import { AxialRotation } from '../core/axial-rotation';

export abstract class AbstractCameraService {

  protected fov = 30;

  protected aspect = 1;

  private mousePressed: boolean;

  private mouseSensivity = 0.05;

  protected coordsMarkerObject: Object3D;

  constructor(protected viewportService: ViewportEventService) {

  }

  private mousePressedFunction(pressed: boolean): (MouseEvent) => void {
    return (event: MouseEvent) => {
      this.mousePressed = pressed;
    };
  }

  private addMouseEventListener(rendererService: RendererService, eventKey: string, funct: (MouseEvent) => void): void {
    rendererService.getDomElement().addEventListener(eventKey, funct);
  }

  public initMouseListeners(rendererService: RendererService,
                            sceneService: SceneService): void {
    this.addMouseEventListener(rendererService, 'mousedown', this.mousePressedFunction(true));
    this.addMouseEventListener(rendererService, 'mouseup', this.mousePressedFunction(false));
    this.addMouseEventListener(rendererService, 'mouseleave', this.mousePressedFunction(false));
    this.addMouseEventListener(rendererService, 'mousemove', (event: MouseEvent) => {
      if (this.mousePressed && event.button === 0) {
        const deltaX = ThreeMath.degToRad(event.movementX * this.mouseSensivity);
        const deltaY = ThreeMath.degToRad(event.movementY * this.mouseSensivity);
        this.getCamera().rotateY(deltaX); // the axes are strangely inversed!
        this.getCamera().rotateX(deltaY);
        rendererService.render(sceneService.getScene(), this.getCamera());
      }
    });
    this.addMouseEventListener(rendererService, 'dblclick', (event: MouseEvent) => {
      this.alignNSAxis();
    });
  }

  abstract getCamera(): Camera;

  protected abstract rotate(rotation: AxialRotation): void;

  protected abstract setFoV(range: number): void;

  protected abstract alignNSAxis(): void;

  public initCoordsMarkerObject(): void {
    this.coordsMarkerObject = new Object3D();
    this.coordsMarkerObject.position.set(0, 0, -(Constants.WORLD_RADIUS + 0.1));
    const camera = this.getCamera();
    camera.add(this.coordsMarkerObject);
    camera.updateMatrixWorld(true);
  }

  public getViewCenterCoordinates(): Vector3 {
    const viewCenter = new Vector3();
    viewCenter.setFromMatrixPosition(this.coordsMarkerObject.matrixWorld);
    return viewCenter;
  }

}
