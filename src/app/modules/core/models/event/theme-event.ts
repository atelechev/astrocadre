import { Event } from '#core/models/event/event';

export class ThemeEvent<T> extends Event<T> {

  public static readonly INITIAL = new ThemeEvent<void>('initial', undefined);

}
