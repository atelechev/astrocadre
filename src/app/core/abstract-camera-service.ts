import { Camera, Math as ThreeMath } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

export abstract class AbstractCameraService {

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
        rendererService.render(sceneService.getScene(), this.getCamera());
      }
    });
  }

  abstract getCamera(): Camera;

}
