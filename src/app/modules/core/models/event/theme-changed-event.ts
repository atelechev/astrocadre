import { ThemeEvent } from '#core/models/event/theme-event';
import { Theme } from '#core/models/theme/theme';


export class ThemeChangedEvent extends ThemeEvent<Theme> {

  public static readonly KEY = 'themeChanged';

  constructor(newTheme: Theme) {
    super(ThemeChangedEvent.KEY, newTheme);
  }

}
