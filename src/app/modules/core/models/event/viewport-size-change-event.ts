import { ViewportEvent } from '#core/models/event/viewport-event';
import { Dimension } from '#core/models/screen/dimension';

/**
 * This event is emitted when the size of the main viewport has changed.
 */
export class ViewportSizeChangeEvent extends ViewportEvent<Dimension> {

  public static readonly KEY = 'viewportSizeChanged';

  constructor(newSize: Dimension) {
    super(ViewportSizeChangeEvent.KEY, newSize);
    this.ensureDataDefined(newSize);
  }

}
