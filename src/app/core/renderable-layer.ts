import { Object3D } from 'three';
import { Observable } from 'rxjs/Observable';
import { Theme } from '../themes/theme';

export interface RenderableLayer {

  getName(): string;

  getObjects(theme: Theme): Observable<Object3D[]>;

}
