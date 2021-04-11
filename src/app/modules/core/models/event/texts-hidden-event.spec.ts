import { TestBed } from '@angular/core/testing';
import { TextsHiddenEvent } from '#core/models/event/texts-hidden-event';
import { AxialCurvesFactoryService } from '#core/services/factories/axial-curves-factory.service';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';

describe('TextsHiddenEvent', () => {

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
    const event = new TextsHiddenEvent(layer);
    expect(event.key).toEqual('textsHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new TextsHiddenEvent(undefined)).toThrowError('The data for textsHidden event must be defined.');
  });

});
