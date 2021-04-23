import { TestBed } from '@angular/core/testing';
import { LayerHiddenEvent } from '#core/models/event/layer-hidden-event';
import { SkyGridLayerFactoryService } from '#layer-sky-grid/services/factories/sky-grid-layer-factory.service';
import { mockedLayers } from '#core/test-utils/mocked-layers.spec';
import { SkyGrid } from '#layer-sky-grid/models/sky-grid';
import { CoreModule } from '#core/core.module';

describe('LayerHiddenEvent', () => {

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
    const event = new LayerHiddenEvent(layer);
    expect(event.key).toEqual('layerHidden');
  });

  it('should throw the expected error if the layer arg is falsy', () => {
    expect(() => new LayerHiddenEvent(undefined)).toThrowError('The data for layerHidden event must be defined.');
  });

});
