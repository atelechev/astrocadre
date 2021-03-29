import { TextOffsets } from '#core/models/layers/factories/text/text-offsets';

describe('TextOffsets', () => {

  it('ZERO_OFFSETS should have expected value', () => {
    const offsets = TextOffsets.ZERO_OFFSETS;
    expect(offsets).toBeDefined();
    expect(offsets.offsetX).toEqual(0);
    expect(offsets.offsetY).toEqual(0);
  });

  it('constructor should create an instance with expected values', () => {
    const offsets = new TextOffsets(1, 2);
    expect(offsets.offsetX).toEqual(1);
    expect(offsets.offsetY).toEqual(2);
  });

});
