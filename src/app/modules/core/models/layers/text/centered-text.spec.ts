import { CenteredText } from '#core/models/layers/text/centered-text';
import { TextOffsets } from '#core/models/layers/text/text-offsets';


describe('CenteredText', () => {

  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
    div.style.fontStyle = 'italic';
    div.style.fontWeight = 'bold';
    div.style.fontSize = '10px';
    div.style.fontFamily = 'arial';
  });

  describe('calculateOffsets should return', () => {

    describe('ZERO_OFFSETS', () => {

      it('if text arg is falsy', () => {
        const offsets = new CenteredText().calculateOffsets(undefined, div);
        expect(offsets).toEqual(TextOffsets.ZERO_OFFSETS);
      });

      it('if htmlElement arg is falsy', () => {
        const offsets = new CenteredText().calculateOffsets('test', undefined);
        expect(offsets).toEqual(TextOffsets.ZERO_OFFSETS);
      });

    });

    it('expected value for valid args', () => {
      const offsets = new CenteredText().calculateOffsets('Vega', div);
      expect(offsets).toBeDefined();
      expect(offsets.offsetX).toEqual(-12);
      expect(offsets.offsetY).toEqual(-5);
    });

  });

});
