import { CenteredText } from '#core/models/layers/factories/text/centered-text';
import { TextOffsets } from '#core/models/layers/factories/text/text-offsets';


describe('CenteredText', () => {

  const createDiv = (): HTMLDivElement => {
    const div = document.createElement('div');
    div.style.fontStyle = 'italic';
    div.style.fontWeight = 'bold';
    div.style.fontSize = '10px';
    div.style.fontFamily = 'arial';
    return div;
  };

  describe('calculateOffsets should return', () => {

    describe('ZERO_OFFSETS', () => {

      it('if text arg is falsy', () => {
        const offsets = new CenteredText().calculateOffsets(undefined, createDiv());
        expect(offsets).toEqual(TextOffsets.ZERO_OFFSETS);
      });

      it('if htmlElement arg is falsy', () => {
        const offsets = new CenteredText().calculateOffsets('test', undefined);
        expect(offsets).toEqual(TextOffsets.ZERO_OFFSETS);
      });

    });

    it('expected value for valid args', () => {
      const offsets = new CenteredText().calculateOffsets('Vega', createDiv());
      expect(offsets).toBeDefined();
      expect(offsets.offsetX).toEqual(-12);
      expect(offsets.offsetY).toEqual(-5);
    });

  });

});
