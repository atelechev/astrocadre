import { TestBed } from '@angular/core/testing';
import { LayerShownEvent } from '#core/models/event/layer-shown-event';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { CoreModule } from '#core/core.module';

describe('LayerShownEvent', () => {

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
    const event = new LayerShownEvent(layer);
    expect(event.key).toEqual('layerShown');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerShownEvent(undefined)).toThrowError('The data for layerShown event must be defined.');
  });

});
