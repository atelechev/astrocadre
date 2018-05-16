import { Object3D } from 'three';
import { Theme } from './theme';
import { ThemeAware } from './theme-aware';
import { ItemsTreeNode } from './items-tree-node';

export abstract class RenderableLayer implements ThemeAware {

  private visible: boolean;

  constructor(protected readonly tree: ItemsTreeNode) {

  }

  public getName(): string {
    return this.tree.code;
  }

  abstract getObjects(): Object3D[];

  public useTheme(theme: Theme): void {
    this.useThemeForThis(theme);
  }

  protected abstract useThemeForThis(theme: Theme): void;

  public setVisible(visible: boolean): void {
    this.visible = visible;
    this.getObjects().forEach(object => object.visible = visible);
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public isParentOf(other: RenderableLayer): boolean {
    const foundAmongChildren = this.tree.children.find(child => child.code === other.tree.code);
    return foundAmongChildren !== undefined;
  }

  public isChildOf(other: RenderableLayer): boolean {
    return other.isParentOf(this);
  }

}
