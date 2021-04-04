import { Event } from '#core/models/event/event';

export class ViewportEvent<T> extends Event<T> {

  public static readonly INITIAL = new ViewportEvent<void>(Event.KEY_INITIAL, undefined);

  constructor(key: string, data: T) {
    super(key, data);
  }

}
