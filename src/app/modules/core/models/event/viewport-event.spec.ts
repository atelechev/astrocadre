import { ViewportEvent } from '#core/models/event/viewport-event';


describe('ViewportEvent', () => {

  it('INITIAL should have expected value', () => {
    expect(ViewportEvent.INITIAL).toBeDefined();
    expect(ViewportEvent.INITIAL.key).toEqual('initial');
    expect(ViewportEvent.INITIAL.data).toBeUndefined();
  });

});
