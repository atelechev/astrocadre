import { Theme } from './theme';

/**
 * Should be implemented by entities whose rendering properties depend on Theme definitions.
 */
export interface ThemeAware {

  /**
   * Applies the properties of the specified Theme to the implementor.
   *
   * @param theme the theme to apply to the current object.
   */
  useTheme(theme: Theme): void;

}
