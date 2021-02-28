import { Layers } from '#core/layers';
import { TextStyle } from '#core-theme/text-style';
import { ThemeDefinition } from '#core-theme/theme-definition';
import { TextStylesFactory } from '#core-theme/abstract-factories';

export class ConstellationNamesTextStylesFactory extends TextStylesFactory {

  constructor() {
    super(Layers.CONSTELLATION_NAMES);
  }

  protected buildTextStylesWith(themeDef: ThemeDefinition): Map<string, TextStyle> {
    const nameLabels = new Map<string, TextStyle>();
    nameLabels.set('labels', themeDef.constellation.names);
    return nameLabels;
  }

}
