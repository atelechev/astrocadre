import { Camera, Math as ThreeMath, PerspectiveCamera } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

export abstract class AbstractCameraService {

  protected fovMax = 70;

  protected fovMin = 40;

  private fovRange = this.fovMax - this.fovMin;

  protected aspectMin = 1;

  protected aspectMax = 1.5;

  private aspectRange = this.aspectMax - this.aspectMin;

  private halfPi = Math.PI / 2;

  private mousePressed: boolean;

  private mouseSensivity = 0.05;

  private mousePressedFunction(pressed: boolean): (MouseEvent) => void {
    return (event: MouseEvent) => {
      this.mousePressed = pressed;
    };
  }

  private addMouseEventListener(rendererService: RendererService, eventKey: string, funct: (MouseEvent) => void): void {
    rendererService.getDomElement().addEventListener(eventKey, funct);
  }

  initMouseListeners(rendererService: RendererService, sceneService: SceneService): void {
    this.addMouseEventListener(rendererService, 'mousedown', this.mousePressedFunction(true));
    this.addMouseEventListener(rendererService, 'mouseup', this.mousePressedFunction(false));
    this.addMouseEventListener(rendererService, 'mouseleave', this.mousePressedFunction(false));
    this.addMouseEventListener(rendererService, 'mousemove', (event: MouseEvent) => {
      if (this.mousePressed && event.button === 0) {
        const deltaX = ThreeMath.degToRad(event.movementX * this.mouseSensivity);
        const deltaY = ThreeMath.degToRad(event.movementY * this.mouseSensivity);
        this.getCamera().rotateY(deltaX); // the axes are strangely inversed!
        this.getCamera().rotateX(deltaY);
        this.updateCameraPropertiesDependingOnRotation();
        rendererService.render(sceneService.getScene(), this.getCamera());
      }
    });
  }

  private calculateViewChangeRatio(xRadians: number): number {
    const absAngle = Math.abs(xRadians);
    if (absAngle < this.halfPi) {
      return Math.cos(absAngle);
    }
    return Math.cos(this.halfPi - (absAngle - this.halfPi));
  }

  private updateCameraPropertiesDependingOnRotation(): void {
    const camera = <PerspectiveCamera> this.getCamera();
    const changeRatio = this.calculateViewChangeRatio(camera.rotation.x);
    camera.fov = this.fovMin + changeRatio * this.fovRange;
    camera.aspect = this.aspectMin + (this.aspectRange - this.aspectRange * changeRatio);
    camera.updateProjectionMatrix();
  }

  abstract getCamera(): Camera;

}
