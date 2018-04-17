import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

// TODO temporary object for tests and learning; should be removed ASAP
export class Cube {

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
