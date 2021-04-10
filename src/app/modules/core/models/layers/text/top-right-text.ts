import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/text/text-offsets';

/**
 * Implements TextOffsetPolicy that places a label on a constant distance to the top right of a point.
 */
export class TopRightText implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(9, -12);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return TopRightText._instance;
  }

}
