import { TextOffsetPolicies } from 'src/app/modules/core/models/layers/factories/text/text-offsets-policies';
import { RenderableText } from 'src/app/modules/core/models/layers/renderable-text';
import { Materials } from 'src/app/modules/core/models/materials';
import { TextStyle } from 'src/app/modules/core/models/text-style';
import { WorldConstants } from 'src/app/modules/core/models/world-constants';
import { toVector3 } from 'src/app/modules/core/utils/vector-utils';


describe('RenderableText', () => {

  let renderable: RenderableText;
  const position = toVector3(37.95, 89.26, WorldConstants.worldRadiusForLayer('stars'));
  const label = 'Polaris';

  beforeEach(() => {
    renderable = buildRenderable();
  });

  const buildRenderable = (): RenderableText =>
    new RenderableText(
      'stars-mag2.0',
      Materials.NAMES_PROPER,
      position,
      label,
      TextOffsetPolicies.TOP_RIGHT
    );

  it('htmlElement should return expected value', () => {
    const html = renderable.htmlElement;
    expect(html).toBeDefined();
    expect(html.tagName).toEqual('DIV');
    expect(html.className).toEqual('ac_label_stars-mag2.0_names-proper');
    expect(html.textContent).toEqual(label);
    expect(html.style.position).toEqual('absolute');
    expect(html.style.zIndex).toEqual('100');
  });

  it('position should return expected value', () => {
    expect(renderable.position).toEqual(position);
  });

  it('offsetX should return expected value', () => {
    expect(renderable.offsetX).toEqual(0);
  });

  it('offsetY should return expected value', () => {
    expect(renderable.offsetY).toEqual(0);
  });

  it('text should return expected value', () => {
    expect(renderable.text).toEqual(label);
  });

  describe('setVisible should', () => {

    it('set the visibility style to "none" for falsy arg', () => {
      const style = renderable.htmlElement.style;
      expect(style.display).toEqual('');
      renderable.setVisible(false);
      expect(style.display).toEqual('none');
    });

    it('set the visibility style to "initial" for true arg', () => {
      const style = renderable.htmlElement.style;
      expect(style.display).toEqual('');
      renderable.setVisible(true);
      expect(style.display).toEqual('initial');
    });

  });

  describe('applyStyles should', () => {

    const textStyle = (
      fontSize: string,
      fontFamily: string,
      fontStyle: string,
      fontWeight: string,
      color: string
    ): TextStyle => ({
      fontSize,
      fontFamily,
      fontStyle,
      fontWeight,
      color
    });

    const assertTextStyleExpected = (expectedStyle: TextStyle): void => {
      const assignedStyle = renderable.htmlElement.style;
      expect(assignedStyle.fontSize).toEqual(expectedStyle.fontSize);
      expect(assignedStyle.fontFamily).toEqual(expectedStyle.fontFamily);
      expect(assignedStyle.fontStyle).toEqual(expectedStyle.fontStyle);
      expect(assignedStyle.fontWeight).toEqual(expectedStyle.fontWeight);
      expect(assignedStyle.color).toEqual(expectedStyle.color);
    };

    const assertInitialStyle = (): void => {
      assertTextStyleExpected(textStyle('', '', '', '', ''));
    };

    describe('have no effect', () => {

      it('if the arg is falsy', () => {
        assertInitialStyle();
        renderable.applyStyles(undefined);
        assertInitialStyle();
      });

      it('if the style was not found by key', () => {
        assertInitialStyle();
        renderable.applyStyles(new Map<string, TextStyle>());
        assertInitialStyle();
      });

    });

    it('should apply the expected style and calculte the offsets', () => {
      assertInitialStyle();
      expect(renderable.offsetX).toEqual(0);
      expect(renderable.offsetY).toEqual(0);

      const assignedStyle = textStyle('10px', 'arial', 'normal', 'bold', 'red');
      const styleMap = new Map<string, TextStyle>();
      styleMap.set(Materials.NAMES_PROPER, assignedStyle);
      renderable.applyStyles(styleMap);

      assertTextStyleExpected(assignedStyle);
      expect(renderable.offsetX).toEqual(9);
      expect(renderable.offsetY).toEqual(-12);
    });

  });

});
