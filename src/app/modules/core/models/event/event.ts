
export abstract class Event<T> {

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

}
