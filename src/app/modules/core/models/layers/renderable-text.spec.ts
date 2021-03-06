import { TextOffsetPolicies } from '#core/models/layers/text/text-offsets-policies';
import { RenderableText } from '#core/models/layers/renderable-text';
import { TextStyle } from '#core/models/theme/text-style';
import { toVector3 } from '#core/utils/vector-utils';
import { ScreenCoordinate } from '#core/models/screen/screen-coordinate';


describe('RenderableText', () => {

  const position = toVector3(37.95, 89.26, 1.96);
  const label = 'Polaris';
  let renderable: RenderableText;

  beforeEach(() => {
    renderable = buildRenderable();
  });

  const buildRenderable = (): RenderableText =>
    new RenderableText(
      position,
      label,
      TextOffsetPolicies.TOP_RIGHT
    );

  it('htmlElement should return expected value', () => {
    const html = renderable.htmlElement;
    expect(html).toBeDefined();
    expect(html.tagName).toEqual('DIV');
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

  describe('applyStyle should', () => {

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

    it('have no effect if the arg is falsy', () => {
      assertInitialStyle();
      renderable.applyStyle(undefined);
      assertInitialStyle();
    });

    it('apply the expected style and calculate the offsets', () => {
      assertInitialStyle();
      expect(renderable.offsetX).toEqual(0);
      expect(renderable.offsetY).toEqual(0);

      const style = textStyle('10px', 'arial', 'normal', 'bold', 'red');
      renderable.applyStyle(style);

      assertTextStyleExpected(style);
      expect(renderable.offsetX).toEqual(9);
      expect(renderable.offsetY).toEqual(-12);
    });

  });

  describe('setPositionAndShow should', () => {

    it('have no effect if the arg is falsy', () => {
      const style = renderable.htmlElement.style;
      const topBefore = style.top;
      const leftBefore = style.left;
      const displayBefore = style.display;

      renderable.setPositionAndShow(undefined);
      expect(style.top).toEqual(topBefore);
      expect(style.left).toEqual(leftBefore);
      expect(style.display).toEqual(displayBefore);
    });

    it('set the expected screen coordinates', () => {
      const coordinate: ScreenCoordinate = { x: 20, y: 30 };

      renderable.setPositionAndShow(coordinate);
      const style = renderable.htmlElement.style;
      expect(style.top).toEqual('30px');
      expect(style.left).toEqual('20px');
      expect(style.display).toEqual('initial');
    });

  });

});
