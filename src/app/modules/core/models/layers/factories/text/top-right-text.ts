import { TextOffsetPolicy } from 'src/app/modules/core/models/layers/factories/text/text-offset-policy';
import { TextOffsets } from 'src/app/modules/core/models/layers/factories/text/text-offsets';

/**
 * Implements TextOffsetPolicy that places a label on a constant distance to the top right of a point.
 */
export class TopRightText implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(9, -12);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return TopRightText._instance;
  }

}
