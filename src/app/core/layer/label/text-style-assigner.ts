import { TextStyle } from '../../theme/text-style';
import { ArgValidator } from '../arg-validator';

/**
 * Provides a method to assign TextStyle properties to a HTMLElement.
 */
export class TextStyleAssigner {

  /**
   * Sets the specified text style properties on the specified HTML element.
   *
   * @param style the text style properties to set
   * @param element the element to apply text style properties on
   */
  public static applyStyleOn(style: TextStyle, element: HTMLElement): void {
    ArgValidator.ensureArgDefined(style, 'style');
    ArgValidator.ensureArgDefined(element, 'element');
    const elementStyle = element.style;
    elementStyle.fontFamily = style.fontFamily;
    elementStyle.fontSize = style.fontSize;
    elementStyle.fontStyle = style.fontStyle;
    elementStyle.fontWeight = style.fontWeight;
    elementStyle.color = style.color;
  }

}
