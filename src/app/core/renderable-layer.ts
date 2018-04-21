import { Object3D } from 'three';
import { Observable } from 'rxjs/Observable';

export interface RenderableLayer {

  getName(): string;

  getObjects(): Observable<Object3D[]>;

}
