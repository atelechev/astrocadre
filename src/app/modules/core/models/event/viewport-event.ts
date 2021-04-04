import { Event } from '#core/models/event/event';

export class ViewportEvent<T> extends Event<T> {

  public static readonly INITIAL = new ViewportEvent<void>('initial', undefined);

}
