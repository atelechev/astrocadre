
export class TextOffsets {

  public static readonly ZERO_OFFSETS = new TextOffsets(0, 0);

  constructor(public readonly offsetX: number,
              public readonly offsetY: number) {

  }

}

export interface TextOffsetPolicy {

  calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets;

}

class CenteredText implements TextOffsetPolicy {

  private static readonly MEASURE_CANVAS = document.createElement('canvas');

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
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

class TopRightText implements TextOffsetPolicy {

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return new TextOffsets(-10, 12);
  }

}

class CloseRightText implements TextOffsetPolicy {

  public calculateOffsets(text: string, htmlElement: HTMLElement): TextOffsets {
    return new TextOffsets(-5, 6);
  }

}

export class TextOffsetPolicies {

  public static readonly CENTERED: TextOffsetPolicy = new CenteredText();

  public static readonly TOP_RIGHT: TextOffsetPolicy = new TopRightText();

  public static readonly CLOSE_RIGHT: TextOffsetPolicy = new CloseRightText();

}

