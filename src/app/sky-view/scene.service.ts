import { Injectable } from '@angular/core';

import { Scene as ThreeScene, Scene, Object3D, Vector3 } from 'three';
import { Camera, PerspectiveCamera, WebGLRenderer, Mesh, Math as ThreeMath } from 'three';
import { Constants } from '../constants';


@Injectable()
export class SceneService {

  private scene: ThreeScene;

  private camera: Camera;

  private renderer: WebGLRenderer;

  private mousePressed: boolean;

  private mouseSensivity = 0.05;

  constructor() {
    this.scene = new ThreeScene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000); // TODO extract params
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(Constants.VIEW_WIDTH, Constants.VIEW_HEIGHT);
    this.setUpCenterWorldCamera();
  }

  private setUpCenterWorldCamera() {
    const origin = 0;
    this.camera.position.z = origin;
    this.camera.position.x = origin;
    this.camera.position.y = origin;
    this.initMouseListeners();
  }

  private mousePressedFunction(pressed: boolean): (MouseEvent) => void {
    return (event: MouseEvent) => {
      this.mousePressed = pressed;
    };
  }

  private addMouseEventListener(eventKey: string, funct: (MouseEvent) => void): void {
    this.renderer.domElement.addEventListener(eventKey, funct);
  }

  private initMouseListeners() {
    this.addMouseEventListener('mousedown', this.mousePressedFunction(true));
    this.addMouseEventListener('mouseup', this.mousePressedFunction(false));
    this.addMouseEventListener('mouseleave', this.mousePressedFunction(false));
    this.addMouseEventListener('mousemove', (event: MouseEvent) => {
      if (this.mousePressed && event.button === 0) {
        const deltaX = ThreeMath.degToRad(event.movementX * this.mouseSensivity);
        const deltaY = ThreeMath.degToRad(event.movementY * this.mouseSensivity);
        this.camera.rotateY(deltaX); // the axes are strangely inversed!
        this.camera.rotateX(deltaY);
        this.render();
      }
    });
  }

  public getDomElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  public addObject(object: Object3D): void {
    this.scene.add(object);
  }

  public addObjects(objects: Object3D[]): void {
    objects.forEach(obj => this.addObject(obj));
  }

  public render(): void {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

}
