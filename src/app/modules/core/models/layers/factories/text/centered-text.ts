import { TextOffsetPolicy } from '#core/models/layers/factories/text/text-offset-policy';
import { TextOffsets } from '#core/models/layers/factories/text/text-offsets';

/**
 * Implements TextOffsetPolicy that allows to place a label centered relatively to a point.
 */
export class CenteredText implements TextOffsetPolicy {

  private readonly _measureCanvas = document.createElement('canvas');

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
    return -parseInt(fontSize.substring(0, fontSize.length - 2), 10) / 2;
  }

  private calculateWidthOffset(text: string, htmlElement: HTMLElement): number {
    const context = this._measureCanvas.getContext('2d');
    context.font = this.getFontStyleForMetrics(htmlElement);
    const textWidth = context.measureText(text).width;
    if (textWidth) {
      return -Math.ceil(textWidth) / 2;
    }
    return 0;
  }

  private getFontStyleForMetrics(htmlElement: HTMLElement): string {
    const style = htmlElement.style;
    return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  }

}
