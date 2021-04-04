import { ThemeEvent } from '#core/models/event/theme-event';


describe('ThemeEvent', () => {

  it('INITIAL should have expected value', () => {
    expect(ThemeEvent.INITIAL).toBeDefined();
    expect(ThemeEvent.INITIAL.key).toEqual('initial');
    expect(ThemeEvent.INITIAL.data).toBeUndefined();
  });

});
