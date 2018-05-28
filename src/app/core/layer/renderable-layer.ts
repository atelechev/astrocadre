import { Object3D } from 'three';
import { Theme } from '../theme/theme';
import { ThemeAware } from '../theme/theme-aware';
import { ItemsTreeNode } from '../items-tree-node';
import { ArgValidator } from './arg-validator';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export abstract class RenderableLayer implements ThemeAware {

  private visible: boolean;

  constructor(protected readonly tree: ItemsTreeNode) {
    ArgValidator.ensureArgDefined(tree, 'tree');
  }

  /**
   * Returns the name of this layer, used as its identifier.
   *
   * @returns string the name/identifier of this layer.
   */
  public getName(): string {
    return this.tree.code;
  }

  /**
   * Returns the array of Three.Object3D that should be rendered in the view.
   */
  abstract getObjects(): Object3D[];

  /**
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  public useTheme(theme: Theme): void {
    ArgValidator.ensureArgDefined(theme, 'theme');
    this.useThemeForThis(theme);
  }

  /**
   * Applies the specified theme on this layer only, excluding its sub-layers.
   *
   * @param theme the theme to apply.
   */
  protected abstract useThemeForThis(theme: Theme): void;

  /**
   * Sets this layer visible.
   *
   * @param visible true to show, false to hide this layer.
   */
  public setVisible(visible: boolean): void {
    this.visible = visible;
    this.getObjects().forEach(object => object.visible = visible);
  }

  public isVisible(): boolean {
    return this.visible;
  }

  /**
   * Returns true if this layer is a parent of the specified layer.
   *
   * @param other the layer to test the relation with.
   *
   * @returns boolean true if this layer is a parent of the one of the argument.
   */
  public isParentOf(other: RenderableLayer): boolean {
    if (!other) {
      return false;
    }
    const foundAmongChildren = this.tree.children.find(child => child.code === other.tree.code);
    return foundAmongChildren !== undefined;
  }

  /**
   * Returns true if this layer is a child of the specified layer.
   *
   * @param other the layer to test the relation with.
   *
   * @returns boolean true if this layer is a child of the one of the argument.
   */
  public isChildOf(other: RenderableLayer): boolean {
    if (!other) {
      return false;
    }
    return other.isParentOf(this);
  }

}
