import { MessierLabelsPolicy } from 'src/app/modules/layer-messier/models/layers/text/messier-labels-policy';


describe('MessierLabelsPolicy', () => {

  it('calculateOffsets should return expected value regardless the args', () => {
    const offsets = new MessierLabelsPolicy().calculateOffsets(undefined, undefined);
    expect(offsets).toBeDefined();
    expect(offsets.offsetX).toEqual(11);
    expect(offsets.offsetY).toEqual(-7);
  });

});
