import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';

describe('TextsShownEvent', () => {

  it('should have the expected key', () => {
    const layer = new AggregateLayer('test', [], 'test');
    const event = new TextsShownEvent(layer);
    expect(event.key).toEqual('textsShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsShownEvent(undefined)).toThrowError('The data for textsShown event must be defined.');
  });

});
