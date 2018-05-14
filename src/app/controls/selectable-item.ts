import { ItemsTreeNode } from '../core/items-tree-node';

export class SelectableItem {

  constructor(public readonly code: string,
              public readonly label: string,
              public readonly description: string,
              public selected: boolean,
              public readonly items: Array<SelectableItem>) {

  }

  public static from(selectable: SelectableItem): SelectableItem {
    const children = (selectable.items) ? selectable.items : [];
    return new SelectableItem(selectable.code,
                              selectable.label,
                              selectable.description,
                              selectable.selected,
                              children);
  }

  public asItemsTree(): ItemsTreeNode {
    const children = this.items ? this.items.map(item => SelectableItem.from(item).asItemsTree()) : [];
    return new ItemsTreeNode(this.code, children);
  }

}
