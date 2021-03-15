
/**
 * Factory utility class allowing to instantiate HTML elements.
 */
export class HtmlElementFactory {

  /**
   * Creates a new HTML div element supposed to contain a label.
   *
   * @param layer the name of the layer that uses this element. Mandatory.
   * @param styleKey the text style key of the label. Mandatory.
   * @param text the text of the label.
   *
   * @returns HTMLElement the instantiated label element.
   */
  public static newLabel(
    layer: string,
    styleKey: string,
    text: string
  ): HTMLElement {
    const element = document.createElement('div');
    element.className = `ac_label_${layer}_${styleKey}`;
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

}
