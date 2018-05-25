import { TextStylesFactory } from './abstract-factories';
import { ThemeDefinition } from './theme-definition';
import { TextStyle } from '../text-style';
import { Layers } from '../layers';

export class StarsTextStyleFactory extends TextStylesFactory {

  constructor() {
    super(Layers.STARS);
  }

  protected buildTextStylesWith(themeDef: ThemeDefinition): Map<string, TextStyle> {
    const starsLabels = new Map<string, TextStyle>();
    starsLabels.set('names-proper', themeDef.stars.names.proper);
    starsLabels.set('names-standard', themeDef.stars.names.standard);
    return starsLabels;
  }

}
