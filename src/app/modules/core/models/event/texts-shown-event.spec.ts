import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { AxialCurvesFactory } from '#core/models/layers/factories/axial-curves-factory';
import { SkyGridLayerFactory } from '#layer-sky-grid/models/sky-grid-layer-factory';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';

describe('TextsShownEvent', () => {

  it('should have the expected key', () => {
    const layer = new SkyGridLayerFactory(new AxialCurvesFactory()).buildRenderableLayer(mockedLayers.subLayers[0]);
    const event = new TextsShownEvent(layer);
    expect(event.key).toEqual('textsShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsShownEvent(undefined)).toThrowError('The data for textsShown event must be defined.');
  });

});
