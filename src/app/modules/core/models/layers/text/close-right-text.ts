import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/text/text-offsets';

/**
 * Implements TextOffsetPolicy that places a label on a constant
 * distance close to the right of a point.
 */
export class CloseRightText implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(6, -5);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return CloseRightText._instance;
  }

}
