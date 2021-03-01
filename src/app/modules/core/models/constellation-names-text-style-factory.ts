import { TextStylesFactory } from '#core/models/abstract-factories';
import { Layers } from '#core/models/layers';
import { TextStyle } from '#core/models/text-style';
import { ThemeDefinition } from '#core/models/theme-definition';

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
