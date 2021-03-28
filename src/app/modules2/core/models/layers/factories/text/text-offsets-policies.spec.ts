import { TextOffsetPolicies } from 'src/app/modules2/core/models/layers/factories/text/text-offsets-policies';


describe('TextOffsetPolicies', () => {

  it('CENTERED should be defined', () => {
    expect(TextOffsetPolicies.CENTERED).toBeDefined();
  });

  it('TOP_RIGHT should be defined', () => {
    expect(TextOffsetPolicies.TOP_RIGHT).toBeDefined();
  });

  it('CLOSE_RIGHT should be defined', () => {
    expect(TextOffsetPolicies.CLOSE_RIGHT).toBeDefined();
  });

});
