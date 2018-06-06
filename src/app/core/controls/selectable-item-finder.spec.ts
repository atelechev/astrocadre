import { SelectableItem } from './selectable-item';
import { SelectableItemFinder } from './selectable-item-finder';

describe('SelectableItemFinder', () => {

  const finder = new SelectableItemFinder();

  const newItem = (code: string, children: Array<SelectableItem> = []): SelectableItem => {
    return new SelectableItem(code, code, undefined, true, children);
  };

  it('#findInSelectableItems should return undefined if itemCode arg is undefined', () => {
    expect(finder.findInSelectableItems(undefined, [])).toBeUndefined();
  });

  it('#findInSelectableItems should return undefined if items arg is undefined', () => {
    expect(finder.findInSelectableItems('test', undefined)).toBeUndefined();
  });

  it('#findInSelectableItems should return undefined if item was not found', () => {
    const items = [ newItem('i1'), newItem('i2') ];
    expect(finder.findInSelectableItems('i0', items)).toBeUndefined();
  });

  it('#findInSelectableItems should return expected item if it is present in root level of the array', () => {
    const items = [ newItem('i1'), newItem('i2') ];
    const found = finder.findInSelectableItems('i2', items);
    expect(found).toBeDefined();
    expect(found.code).toBe('i2');
  });

  it('#findInSelectableItems should return expected item if it is present among children', () => {
    const items = [ newItem('i1', [ newItem('i1c1') ]), newItem('i2', [ newItem('i2c1') ]) ];
    const found = finder.findInSelectableItems('i2c1', items);
    expect(found).toBeDefined();
    expect(found.code).toBe('i2c1');
  });

});
