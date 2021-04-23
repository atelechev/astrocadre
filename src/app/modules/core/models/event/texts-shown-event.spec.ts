import { TestBed } from '@angular/core/testing';
import { TextsShownEvent } from '#core/models/event/texts-shown-event';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { CoreModule } from '#core/core.module';

describe('TextsShownEvent', () => {

  let layer: SkyGrid;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
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
