import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#core/models/layers/factories/sky-grid-layer-factory';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

describe('TextsHiddenEvent', () => {

  it('should have the expected key', () => {
    const factory = new SkyGridLayerFactory(mockedLayers.subLayers[0], new AxialCurvesFactory());
    const layer = factory.buildRenderableLayer();
    const event = new TextsHiddenEvent(layer);
    expect(event.key).toEqual('textsHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsHiddenEvent(undefined)).toThrowError('The data for textsHidden event must be defined.');
  });

});
