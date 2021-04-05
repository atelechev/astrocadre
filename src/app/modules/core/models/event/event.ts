
/**
 * Base class for all objects used to wrap events data.
 */
export abstract class Event<T> {

  /**
   * This key is used for the initial events emitted
   * when a BehaviorSubjet is created.
   */
  protected static readonly KEY_INITIAL = 'initial';

  constructor(
    private readonly _key: string,
    private readonly _data: T
  ) {

  }

  /**
   * Returns the key that denotes the meaning of this event.
   */
  public get key(): string {
    return this._key;
  }

  /**
   * The data associated with this event.
   */
  public get data(): T {
    return this._data;
  }

  /**
   * Ensures that the arg is not undefined nor null.
   *
   * This method should be called from the constructor, when the
   * event type does not accept the data object to be undefined.
   *
   * @param data the event data object to check.
   */
  protected ensureDataDefined(data: T): void {
    if (data === undefined || data === null) {
      throw new Error(`The data for ${this.key} event must be defined.`);
    }
  }

}
