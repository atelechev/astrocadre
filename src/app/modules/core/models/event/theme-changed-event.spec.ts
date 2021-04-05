import { ThemeChangedEvent } from '#core/models/event/theme-changed-event';
import { themeDefault } from '#core/models/theme/theme-default';

describe('ThemeChangedEvent', () => {

  it('should have the expected key', () => {
    const event = new ThemeChangedEvent(themeDefault);
    expect(event.key).toEqual('themeChanged');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new ThemeChangedEvent(undefined)).toThrowError('The data for themeChanged event must be defined.');
  });

});
