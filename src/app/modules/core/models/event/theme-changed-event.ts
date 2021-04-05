import { ThemeEvent } from '#core/models/event/theme-event';
import { Theme } from '#core/models/theme/theme';

/**
 * This event is emitted when the selection of the theme has changed.
 */
export class ThemeChangedEvent extends ThemeEvent<Theme> {

  public static readonly KEY = 'themeChanged';

  constructor(newTheme: Theme) {
    super(ThemeChangedEvent.KEY, newTheme);
    this.ensureDataDefined(newTheme);
  }

}
