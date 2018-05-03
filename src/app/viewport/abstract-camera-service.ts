import { Camera, Math as ThreeMath, PerspectiveCamera } from 'three';
import { RendererService } from './renderer.service';
import { SceneService } from './scene.service';

export abstract class AbstractCameraService {

  protected fov = 55;

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
    this.addMouseEventListener(rendererService, 'dblclick', (event: MouseEvent) => {
      // TODO align with meridian on double click
      // this.getCamera().rotation.y = 0;
      this.getCamera().rotation.z -= 0.1;
      // console.log(`rotX=${this.getCamera().rotation.x} rotY=${this.getCamera().rotation.y} rotZ=${this.getCamera().rotation.z}`);
    });
  }

  abstract getCamera(): Camera;

  public rotate(rx: number, ry: number, rz: number): void {
    const camera = this.getCamera();
    camera.rotateX(rx);
    camera.rotateY(ry);
    camera.rotateZ(rz);
  }

  public setFoV(range: number): void {
    const camera = <PerspectiveCamera> this.getCamera();
    camera.fov = parseInt('' + range, 10); // TODO weird
    camera.updateProjectionMatrix();
  }

  public alignSNAxis(): void {
    const camera = this.getCamera();
    // TODO
    // console.log(`rx=${camera.rotation.x} ry=${camera.rotation.y} rz=${camera.rotation.z}`);
    // console.log(`dx=${ThreeMath.radToDeg(camera.rotation.x)} dy=${ThreeMath.radToDeg(camera.rotation.y)} dz=${ThreeMath.radToDeg(camera.rotation.z})`);
    const delta = camera.rotation.z > 0 ? -camera.rotation.z : camera.rotation.z;
    // console.log('delta=' + delta);
    // camera.rotateZ(delta);
  }

}
