import { TextOffsets } from '#core/models/layers/factories/text/text-offsets';


/**
 * Provides a method to calculate TextOffsets.
 */
export interface TextOffsetPolicy {

  /**
   * Calculates the offsets to apply on the specified text and HTML element.
   *
   * @param text the text to calculate the offsets for.
   * @param htmlElement the HTML element to calculate the offsets for.
   *
   * @returns TextOffsets the calculated offsets.
   */
  calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets;

}
