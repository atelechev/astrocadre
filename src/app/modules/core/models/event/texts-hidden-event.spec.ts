import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';

describe('TextsHiddenEvent', () => {

  it('should have the expected key', () => {
    const layer = new AggregateLayer('test', [], 'test');
    const event = new TextsHiddenEvent(layer);
    expect(event.key).toEqual('textsHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsHiddenEvent(undefined)).toThrowError('The data for textsHidden event must be defined.');
  });

});
