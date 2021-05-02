import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { AggregateLayer } from '#core/models/layers/aggregate-layer';


describe('LayerHiddenEvent', () => {

  it('should have the expected key', () => {
    const layer = new AggregateLayer('test', [], 'test');
    const event = new LayerHiddenEvent(layer);
    expect(event.key).toEqual('layerHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerHiddenEvent(undefined)).toThrowError('The data for layerHidden event must be defined.');
  });

});
