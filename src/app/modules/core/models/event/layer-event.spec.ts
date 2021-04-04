import { LayerEvent } from '#core/models/event/layer-event';


describe('LayerEvent', () => {

  it('INITIAL should have expected value', () => {
    expect(LayerEvent.INITIAL).toBeDefined();
    expect(LayerEvent.INITIAL.key).toEqual('initial');
    expect(LayerEvent.INITIAL.data).toBeUndefined();
  });

});
