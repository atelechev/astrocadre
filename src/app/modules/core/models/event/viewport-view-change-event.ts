import { ViewportEvent } from '#core/models/event/viewport-event';


export class ViewportViewChangeEvent extends ViewportEvent<string> {

  public static readonly KEY = 'viewportViewChanged';

  constructor(change: string) {
    super(ViewportViewChangeEvent.KEY, change);
    this.ensureDataDefined(change);
  }

}
