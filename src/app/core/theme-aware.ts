import { Theme } from './theme';

export interface ThemeAware {

  useTheme(theme: Theme): void;

}
