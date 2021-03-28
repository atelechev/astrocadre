import { TopRightText } from 'src/app/modules2/core/models/layers/factories/text/top-right-text';


describe('TopRightText', () => {

  it('calculateOffsets should return expected value regardless the args', () => {
    const offsets = new TopRightText().calculateOffsets(undefined, undefined);
    expect(offsets).toBeDefined();
    expect(offsets.offsetX).toEqual(9);
    expect(offsets.offsetY).toEqual(-12);
  });

});
