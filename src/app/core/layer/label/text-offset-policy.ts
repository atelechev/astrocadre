
/**
 * Wraps values of X an Y axis offsets to apply on an element while calculating its position in the view.
 */
export class TextOffsets {

  public static readonly ZERO_OFFSETS = new TextOffsets(0, 0);

  constructor(public readonly offsetX: number,
              public readonly offsetY: number) {

  }

}

/**
 * Provides access to a method that implements rules to calculate TextOffsets.
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

/**
 * Implements TextOffsetPolicy that allows to place a label centered relatively to a point.
 */
class CenteredText implements TextOffsetPolicy {

  private static readonly MEASURE_CANVAS = document.createElement('canvas');

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    if (!text || !htmlElement) {
      return TextOffsets.ZERO_OFFSETS;
    }
    return new TextOffsets(
      this.calculateWidthOffset(text, htmlElement),
      this.calculateHeightOffset(htmlElement)
    );
  }

  private calculateHeightOffset(htmlElement: HTMLElement): number {
    const fontSize = htmlElement.style.fontSize;
    return parseInt(fontSize.substring(0, fontSize.length - 2), 10) / 2;
  }

  private calculateWidthOffset(text: string, htmlElement: HTMLElement): number {
    const context = CenteredText.MEASURE_CANVAS.getContext('2d');
    context.font = this.getFontStyleForMetrics(htmlElement);
    const textWidth = context.measureText(text).width;
    if (textWidth) {
      return Math.ceil(textWidth) / 2;
    }
    return 0;
  }

  private getFontStyleForMetrics(htmlElement: HTMLElement): string {
    const style = htmlElement.style;
    return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  }

}

/**
 * Implements TextOffsetPolicy that places a label on a constant distance to the top right of a point.
 */
class TopRightText implements TextOffsetPolicy {

  private static readonly TOP_RIGHT_SINGLETON = new TextOffsets(9, -12);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return TopRightText.TOP_RIGHT_SINGLETON;
  }

}

/**
 * Implements TextOffsetPolicy that places a label on a constant distance close to the right of a point.
 */
class CloseRightText implements TextOffsetPolicy {

  private static readonly CLOSE_RIGHT_SINGLETON = new TextOffsets(6, -5);

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return CloseRightText.CLOSE_RIGHT_SINGLETON;
  }

}

/**
 * Provides access to existing TextOffsetPolicies.
 */
export class TextOffsetPolicies {

  public static readonly CENTERED: TextOffsetPolicy = new CenteredText();

  public static readonly TOP_RIGHT: TextOffsetPolicy = new TopRightText();

  public static readonly CLOSE_RIGHT: TextOffsetPolicy = new CloseRightText();

}

