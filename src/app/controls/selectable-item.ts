import { Selectable } from './selectable';

export class SelectableItem implements Selectable {

  constructor(public readonly code: string,
              public readonly label: string,
              public readonly description: string,
              public selected: boolean) {

  }

  public static from(selectable: Selectable): SelectableItem {
    return new SelectableItem(selectable.code,
                              selectable.label,
                              selectable.description,
                              selectable.selected);
  }

}
