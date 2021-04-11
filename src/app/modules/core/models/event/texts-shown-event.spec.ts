import { TestBed } from '@angular/core/testing';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';

describe('TextsShownEvent', () => {

  let layer: SkyGrid;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AxialCurvesFactoryService,
        SkyGridLayerFactoryService
      ]
    });
    layer = TestBed.inject(SkyGridLayerFactoryService).buildRenderableLayer(mockedLayers.subLayers[0]);
  });

  it('should have the expected key', () => {
    const event = new TextsShownEvent(layer);
    expect(event.key).toEqual('textsShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsShownEvent(undefined)).toThrowError('The data for textsShown event must be defined.');
  });

});
