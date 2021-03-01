import { TextStylesFactory } from '#core/models/abstract-factories';
import { Layers } from '#core/models/layers';
import { TextStyle } from '#core/models/text-style';
import { ThemeDefinition } from '#core/models/theme-definition';

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
