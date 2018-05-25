import { TextStylesFactory } from './abstract-factories';
import { ThemeDefinition } from './theme-definition';
import { TextStyle } from './text-style';
import { Layers } from '../layers';

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
