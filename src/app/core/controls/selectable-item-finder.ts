import { SelectableItem } from './selectable-item';

export class SelectableItemFinder {

  public findInSelectableItems(itemCode: string, items: Array<SelectableItem>): SelectableItem {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.code === itemCode) {
          return item;
        } else {
          const foundAmongChildren = this.findInSelectableItems(itemCode, item.items);
          if (foundAmongChildren) {
            return foundAmongChildren;
          }
        }
      }
    }
    return undefined;
  }

}
