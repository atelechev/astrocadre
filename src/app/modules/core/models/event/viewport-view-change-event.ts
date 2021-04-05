import { ViewportEvent } from '#core/models/event/viewport-event';

/**
 * This event is emitted when the view in the main viewport has changed (rotated, moved etc).
 */
export class ViewportViewChangeEvent extends ViewportEvent<string> {

  public static readonly KEY = 'viewportViewChanged';

  constructor(change: string) {
    super(ViewportViewChangeEvent.KEY, change);
    this.ensureDataDefined(change);
  }

}
