import { SunMoonLabelsPolicy } from '#layer-solar-system/model/layers/sun-moon-labels-policy';


describe('SunMoonLabelsPolicy', () => {

  it('calculateOffsets should return expected value regardless the args', () => {
    const offsets = new SunMoonLabelsPolicy().calculateOffsets(undefined, undefined);
    expect(offsets).toBeDefined();
    expect(offsets.offsetX).toEqual(19);
    expect(offsets.offsetY).toEqual(-7);
  });

});
