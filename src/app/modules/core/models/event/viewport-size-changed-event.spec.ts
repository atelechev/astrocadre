import { ViewportSizeChangeEvent } from '#core/models/event/viewport-size-change-event';

describe('ViewportSizeChangeEvent', () => {

  it('should have the expected key', () => {
    const event = new ViewportSizeChangeEvent({ height: 10, width: 20 });
    expect(event.key).toEqual('viewportSizeChanged');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new ViewportSizeChangeEvent(undefined)).toThrowError('The data for viewportSizeChanged event must be defined.');
  });

});
