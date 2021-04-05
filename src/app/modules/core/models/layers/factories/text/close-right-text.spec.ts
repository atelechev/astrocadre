import { CloseRightText } from '#core/models/layers/factories/text/close-right-text';

describe('CloseRightText', () => {

  it('calculateOffsets should return expected value regardless the args', () => {
    const offsets = new CloseRightText().calculateOffsets(undefined, undefined);
    expect(offsets).toBeDefined();
    expect(offsets.offsetX).toEqual(6);
    expect(offsets.offsetY).toEqual(-5);
  });

});
