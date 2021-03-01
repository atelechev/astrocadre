import { TextStyle } from '#core/models/text-style';
import { ensureArgDefined } from '#core/utils/arg-validation-utils';

/**
 * Sets the specified text style properties on the specified HTML element.
 *
 * @param style the text style properties to set
 * @param element the element to apply text style properties on
 */
export const applyStyleOn = (style: TextStyle, element: HTMLElement): void => {
  ensureArgDefined(style, 'style');
  ensureArgDefined(element, 'element');
  const elementStyle = element.style;
  elementStyle.fontFamily = style.fontFamily;
  elementStyle.fontSize = style.fontSize;
  elementStyle.fontStyle = style.fontStyle;
  elementStyle.fontWeight = style.fontWeight;
  elementStyle.color = style.color;
};
