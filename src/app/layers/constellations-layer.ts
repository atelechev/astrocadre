import { RenderableLayer } from '../core/renderable-layer';
import { Layers } from '../core/layers';
import { Object3D } from 'three';
import { Theme } from '../core/theme';

export class ConstellationsLayer extends RenderableLayer {

  public getObjects(): Object3D[] {
    return [];
  }

  public useThemeForThis(theme: Theme): void {
    // no own graphics, all are in sub-layers
  }

}
