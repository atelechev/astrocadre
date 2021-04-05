import { Event } from '#core/models/event/event';

/**
 * Represents the events occurring to the themes.
 */
export class ThemeEvent<T> extends Event<T> {

  public static readonly INITIAL = new ThemeEvent<void>(Event.KEY_INITIAL, undefined);

  constructor(key: string, data: T) {
    super(key, data);
  }

}
