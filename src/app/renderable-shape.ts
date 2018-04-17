import { Mesh } from 'three';

export interface RenderableShape {

  getMesh(): Mesh;

}
