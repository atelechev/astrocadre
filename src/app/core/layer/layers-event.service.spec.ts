import { LayersEventService } from './layers-event.service';
import { TestBed } from '@angular/core/testing';
import { ItemsTreeNode } from '../items-tree-node';
import { LayerVisibility } from './layer-visibility';
import { StarLabelVisibility } from './star-label-visibility';

describe('ViewportEventService', () => {

  let service: LayersEventService;

  beforeAll(() => {
    TestBed.configureTestingModule({ providers: [LayersEventService] });
    service = TestBed.get(LayersEventService);
  });

  it('#layerLoaded should broadcast event for the specified params', () => {
    const params = 'test_layer_1';
    const subscribed = service.broadcastLayerLoaded$.subscribe(
      (l: string) => expect(l).toBe(params)
    );
    service.layerLoaded(params);
    subscribed.unsubscribe();
  });

  it('#loadLayerRequested should broadcast event for the specified params', () => {
    const params = new ItemsTreeNode('test_layer_2', []);
    const subscribed = service.requestLayerLoad$.subscribe(
      (l: ItemsTreeNode) => expect(l).toBe(params)
    );
    service.loadLayerRequested(params);
    subscribed.unsubscribe();
  });

  it('#layerVisibleRequested should broadcast event for the specified params', () => {
    const params = { layer: 'test_layer_3', visible: true };
    const subscribed = service.requestLayerVisibility$.subscribe(
      (lv: LayerVisibility) => expect(lv).toBe(params)
    );
    service.layerVisibleRequested(params);
    subscribed.unsubscribe();
  });

  it('#starsMagnitudeRequested should broadcast event for the specified params', () => {
    const params = 10;
    const subscribed = service.requestStarsMagnitude$.subscribe(
      (m: number) => expect(m).toBe(params)
    );
    service.starsMagnitudeRequested(params);
    subscribed.unsubscribe();
  });

  it('#starsLabelsVisibleRequested should broadcast event for the specified params', () => {
    const params = { magnitude: 11, visible: true };
    const subscribed = service.requestStarsLabelsVisibility$.subscribe(
      (mv: StarLabelVisibility) => expect(mv).toBe(params)
    );
    service.starsLabelsVisibleRequested(params);
    subscribed.unsubscribe();
  });

  it('#starsLabelsTypeRequested should broadcast event for the specified params', () => {
    const params = 'test_label_type';
    const subscribed = service.requestStarsLabelsType$.subscribe(
      (lt: string) => expect(lt).toBe(params)
    );
    service.starsLabelsTypeRequested(params);
    subscribed.unsubscribe();
  });

});
