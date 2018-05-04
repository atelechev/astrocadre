import { Camera, Math as ThreeMath, PerspectiveCamera } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';
import { CameraAction } from '../core/camera-action';

export abstract class AbstractCameraService {

  protected fov = 30;

  protected aspect = 1;

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

  public initMouseListeners(rendererService: RendererService, sceneService: SceneService): void {
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
      // TODO align with meridian on double click
      // this.getCamera().rotation.y = 0;
      this.getCamera().rotation.z = 0;
      // console.log(`rotX=${this.getCamera().rotation.x} rotY=${this.getCamera().rotation.y} rotZ=${this.getCamera().rotation.z}`);
    });
  }

  abstract getCamera(): Camera;

  protected abstract rotate(rx: number, ry: number, rz: number): void;

  protected abstract setFoV(range: number): void;

  protected abstract alignNSAxis(): void;

  public processAction(event: any): void {
    switch (event.action) {
      case CameraAction.ROTATE: {
        this.rotate(event.x, event.y, event.z);
        break;
      }
      case CameraAction.FIELD_OF_VIEW: {
        this.setFoV(event.range);
        break;
      }
      case CameraAction.ALIGN_NS_AXIS: {
        this.alignNSAxis();
        break;
      }
      default: {
        console.log('Unsupported camera action: ' + event.action);
      }
    }
  }

}
