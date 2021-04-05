import { Event } from '#core/models/event/event';

/**
 * Represents the events occurring to the renderable layers.
 */
export class LayerEvent<T> extends Event<T> {

  public static readonly INITIAL = new LayerEvent<void>(Event.KEY_INITIAL, undefined);

  constructor(key: string, data: T) {
    super(key, data);
  }

}
