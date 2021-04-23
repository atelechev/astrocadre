import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/text/text-offsets';

/**
 * Implements TextOffsetPolicy to place a label for the objects representing the Sun and the Moon.
 */
export class SunMoonLabelsPolicy implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(19, -7);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return SunMoonLabelsPolicy._instance;
  }

}
