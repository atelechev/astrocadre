import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#core/models/layers/factories/sky-grid-layer-factory';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

describe('LayerHiddenEvent', () => {

  it('should have the expected key', () => {
    const factory = new SkyGridLayerFactory(mockedLayers.subLayers[0], new AxialCurvesFactory());
    const layer = factory.buildRenderableLayer();
    const event = new LayerHiddenEvent(layer);
    expect(event.key).toEqual('layerHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerHiddenEvent(undefined)).toThrowError('The data for layerHidden event must be defined.');
  });

});
