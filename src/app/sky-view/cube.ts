
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { RenderableShape } from '../renderable-shape';

// TODO temporary object for tests and learning; should be removed ASAP
export class Cube implements RenderableShape {

  private mesh: Mesh;

  constructor() {
    const geometry = new BoxGeometry(1, 1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new Mesh(geometry, material);
  }

  public getMesh(): Mesh {
    return this.mesh;
  }

}
