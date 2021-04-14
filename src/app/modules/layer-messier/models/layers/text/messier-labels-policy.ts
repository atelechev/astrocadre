import { TextOffsetPolicy } from '#core/models/layers/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/text/text-offsets';

/**
 * Implements TextOffsetPolicy to place a label for a messier object.
 */
export class MessierLabelsPolicy implements TextOffsetPolicy {

  private static readonly _instance = new TextOffsets(11, -7);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return MessierLabelsPolicy._instance;
  }

}
