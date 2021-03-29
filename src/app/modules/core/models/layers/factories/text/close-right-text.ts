import { TextOffsetPolicy } from 'src/app/modules/core/models/layers/factories/text/text-offset-policy';
import { TextOffsets } from 'src/app/modules/core/models/layers/factories/text/text-offsets';

/**
 * Implements TextOffsetPolicy that places a label on a constant distance close to the right of a point.
 */
export class CloseRightText implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(6, -5);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return CloseRightText._instance;
  }

}
