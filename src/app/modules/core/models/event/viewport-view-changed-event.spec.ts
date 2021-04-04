import { ViewportViewChangeEvent } from '#core/models/event/viewport-view-change-event';

describe('ViewportViewChangeEvent', () => {

  it('should have the expected key', () => {
    const event = new ViewportViewChangeEvent('rotate');
    expect(event.key).toEqual('viewportViewChanged');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new ViewportViewChangeEvent(undefined)).toThrowError('The data for viewportViewChanged event must be defined.');
  });

});
