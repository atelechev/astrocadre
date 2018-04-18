import { Object3D } from 'three';

export interface RenderableLayer {

  getObjects(): Object3D[];

}
