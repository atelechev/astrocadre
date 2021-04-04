
export abstract class Event<T> {

  protected static readonly KEY_INITIAL = 'initial';

  constructor(
    private readonly _key: string,
    private readonly _data: T
  ) {

  }

  public get key(): string {
    return this._key;
  }

  public get data(): T {
    return this._data;
  }

  protected ensureDataDefined(data: T): void {
    if (data === undefined || data === null) {
      throw new Error(`The data for ${this.key} event must be defined.`);
    }
  }

}
