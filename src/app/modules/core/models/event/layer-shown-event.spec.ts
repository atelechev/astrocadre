import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';

describe('LayerShownEvent', () => {

  it('should have the expected key', () => {
    const layer = new AggregateLayer('test', [], 'test');
    const event = new LayerShownEvent(layer);
    expect(event.key).toEqual('layerShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerShownEvent(undefined)).toThrowError('The data for layerShown event must be defined.');
  });

});
