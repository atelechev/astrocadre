import { TextOffsets, TextOffsetPolicies } from '#core/models/text-offset-policy';

describe('TextOffsetPolicy', () => {

  const zeroOffset = TextOffsets.ZERO_OFFSETS;

  const closeRightPolicy = TextOffsetPolicies.CLOSE_RIGHT;

  const topRightPolicy = TextOffsetPolicies.TOP_RIGHT;

  const centeredPolicy = TextOffsetPolicies.CENTERED;

  const assertOffsetsExpected = (expectedOffsetX: number,
    expectedOffsetY: number,
    checkedOffsets: TextOffsets) => {
    expect(checkedOffsets.offsetX).toBe(expectedOffsetX);
    expect(checkedOffsets.offsetY).toBe(expectedOffsetY);
  };

  const newStyledHtmlElement = () => {
    const element = document.createElement('div');
    element.style.fontSize = '10px';
    element.style.fontFamily = 'arial';
    element.style.fontStyle = 'normal';
    element.style.fontWeight = 'normal';
    return element;
  };

  it('ZERO_OFFSETS should be 0 for X and Y', () => {
    assertOffsetsExpected(0, 0, zeroOffset);
  });

  describe('CLOSE_RIGHT should return', () => {

    it('offset of (6, -5) for undefined text', () => {
      const element = document.createElement('div');
      const offsets = closeRightPolicy.calculateOffsets(undefined, element);
      assertOffsetsExpected(6, -5, offsets);
    });

    it('offset of (6, -5) for undefined element', () => {
      const offsets = closeRightPolicy.calculateOffsets('test', undefined);
      assertOffsetsExpected(6, -5, offsets);
    });

    it('offset of (6, -5) for any element', () => {
      const texts = ['a', 'test', 'test test test'];
      texts.forEach(
        (text: string) => {
          const element = document.createElement('div');
          const offsets = closeRightPolicy.calculateOffsets(text, element);
          assertOffsetsExpected(6, -5, offsets);
        }
      );
    });

  });

  describe('TOP_RIGHT should return', () => {

    it('offset of (9, -12) for undefined text', () => {
      const element = document.createElement('div');
      const offsets = topRightPolicy.calculateOffsets(undefined, element);
      assertOffsetsExpected(9, -12, offsets);
    });

    it('offset of (9, -12) for undefined element', () => {
      const offsets = topRightPolicy.calculateOffsets('test', undefined);
      assertOffsetsExpected(9, -12, offsets);
    });

    it('offset of (9, -12) for any element', () => {
      const texts = ['a', 'test', 'test test test'];
      texts.forEach(
        (text: string) => {
          const element = document.createElement('div');
          const offsets = topRightPolicy.calculateOffsets(text, element);
          assertOffsetsExpected(9, -12, offsets);
        }
      );
    });

  });

  describe('CENTERED should', () => {

    it('return (0, 0) if text is undefined', () => {
      const element = document.createElement('div');
      const offsets = centeredPolicy.calculateOffsets(undefined, element);
      assertOffsetsExpected(0, 0, offsets);
    });

    it('return (0, 0) if element is undefined', () => {
      const offsets = centeredPolicy.calculateOffsets('test', undefined);
      assertOffsetsExpected(0, 0, offsets);
    });

    it('return expected offsets for one character text', () => {
      const offsets = centeredPolicy.calculateOffsets('a', newStyledHtmlElement());
      assertOffsetsExpected(-3, -5, offsets);
    });

    it('return expected offsets for a short word', () => {
      const offsets = centeredPolicy.calculateOffsets('test', newStyledHtmlElement());
      assertOffsetsExpected(-8.5, -5, offsets);
    });

    it('return expected offsets for longer text', () => {
      const offsets = centeredPolicy.calculateOffsets('lorem ipsum dolor sit amet', newStyledHtmlElement());
      assertOffsetsExpected(-59, -5, offsets);
    });

    describe('take into account', () => {

      it('fontSize property for Y offset', () => {
        const element = newStyledHtmlElement();
        element.style.fontSize = '20px';
        const offsets = centeredPolicy.calculateOffsets('test', element);
        assertOffsetsExpected(-16.5, -10, offsets);
      });

      it('fontWeight property for X offset', () => {
        const element = newStyledHtmlElement();
        element.style.fontWeight = 'bold';
        const offsets = centeredPolicy.calculateOffsets('test', element);
        assertOffsetsExpected(-9, -5, offsets);
      });

      it('fontStyle property for X offset', () => {
        const element = newStyledHtmlElement();
        element.style.fontStyle = 'italic';
        const offsets = centeredPolicy.calculateOffsets('test', element);
        assertOffsetsExpected(-8.5, -5, offsets);
      });

      it('fontFamily property for X offset', () => {
        const element = newStyledHtmlElement();
        element.style.fontFamily = 'dialog';
        const offsets = centeredPolicy.calculateOffsets('test', element);
        assertOffsetsExpected(-7, -5, offsets);
      });

    });

  });

});
