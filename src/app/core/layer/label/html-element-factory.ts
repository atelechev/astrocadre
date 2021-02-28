import { ensureStringDefinedNotEmpty } from '#core/arg-validation-utils';

/**
 * Factory utility class allowing to instantiate HTML elements.
 */
export class HtmlElementFactory {

  /**
   * Creates a new HTML div element supposed to contain a label.
   *
   * @param layerName the name of the layer that uses this element. Mandatory.
   * @param styleKey the text style key of the label. Mandatory.
   * @param text the label text.
   *
   * @returns HTMLElement the instantiated label element.
   */
  public static newLabel(layerName: string,
    styleKey: string,
    text: string): HTMLElement {
    ensureStringDefinedNotEmpty(layerName, 'layerName');
    ensureStringDefinedNotEmpty(styleKey, 'styleKey');
    const element = document.createElement('div');
    element.className = `label_${layerName}_${styleKey}`;
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

}
