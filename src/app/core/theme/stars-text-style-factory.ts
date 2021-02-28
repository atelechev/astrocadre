import { Layers } from '#core/layers';
import { TextStylesFactory } from '#core-theme/abstract-factories';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { TextStyle } from '#core-theme/text-style';

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
