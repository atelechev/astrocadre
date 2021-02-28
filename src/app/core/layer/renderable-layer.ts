import { Object3D } from 'three';
import { Theme } from '#core-theme/theme';
import { ThemeAware } from '#core-theme/theme-aware';
import { TreeNode } from '#core/tree-node';
import { ensureArgDefined } from '#core/arg-validation-utils';
import { RenderableText } from '#core-layer/label/renderable-text';

/**
 * Represents a layer of objects that can be rendered/visualized in the view.
 */
export class RenderableLayer implements ThemeAware {

  private labelsShown: boolean;

  constructor(protected readonly tree: TreeNode) {
    ensureArgDefined(tree, 'tree');
    this.labelsShown = true;
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
  public getObjects(): Object3D[] {
    return [];
  }

  /**
   * Applies the specified theme on this layer.
   *
   * @param theme the theme to apply.
   */
  public useTheme(theme: Theme): void {
    ensureArgDefined(theme, 'theme');
    this.useThemeForThis(theme);
  }

  /**
   * Sets this layer visible.
   *
   * @param visible true to show, false to hide this layer.
   */
  public setVisible(visible: boolean): void {
    this.tree.selected = visible;
    this.getObjects().forEach(object => object.visible = visible);
  }

  public isVisible(): boolean {
    return this.tree.selected;
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
    if (this.tree.nodes) {
      const foundAmongChildren = this.tree.nodes.find(child => child.code === other.tree.code);
      return foundAmongChildren !== undefined;
    }
    return false;
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

  /**
   * Returns the array of HTMLElements with text contents to show for this layer.
   */
  public getTextElements(): Array<HTMLElement> {
    return [];
  }

  /**
   * Returns the Map of existing RenderableText items and their identifiers, registered for this layer.
   */
  public getRenderableLabels(): Map<string, RenderableText> {
    return new Map<string, RenderableText>();
  }

  /**
   * Returns true if the text/labels associated with this layer should be shown.
   */
  public isLabelsShown(): boolean {
    return this.labelsShown;
  }

  /**
   * Sets the visibility of text/labels assiciated with this layer.
   *
   * @param show true to show the labels.
   */
  public setLabelsShown(show: boolean): void {
    this.labelsShown = show;
  }

  /**
   * Applies the specified theme on this layer only, excluding its sub-layers.
   *
   * @param theme the theme to apply.
   */
  protected useThemeForThis(theme: Theme): void {
    // no own graphics, all are in sub-layers
  }

}
