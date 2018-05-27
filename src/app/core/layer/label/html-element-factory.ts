import { ArgValidator } from '../arg-validator';

export class HtmlElementFactory {

  public static newLabel(layerName: string,
                         styleKey: string,
                         text: string): HTMLElement {
    ArgValidator.ensureStringDefinedNotEmpty(layerName, 'layerName');
    ArgValidator.ensureStringDefinedNotEmpty(styleKey, 'styleKey');
    const element = document.createElement('div');
    element.className = `label_${layerName}_${styleKey}`;
    element.textContent = text;
    element.style.position = 'absolute';
    element.style.zIndex = '100';
    return element;
  }

}
