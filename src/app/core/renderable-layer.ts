import { Object3D } from 'three';
import { Theme } from './theme';
import { ThemeAware } from './theme-aware';

export abstract class RenderableLayer implements ThemeAware {

  abstract getName(): string;

  abstract getObjects(): Object3D[];

  abstract useTheme(theme: Theme): void;

  public setVisible(visible: boolean): void {
    this.getObjects().forEach(object => object.visible = visible);
  }

}
