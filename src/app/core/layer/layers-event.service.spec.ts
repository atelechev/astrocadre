import { TestBed } from '@angular/core/testing';
import { LayersEventService } from '#core-layer/layers-event.service';
import { TreeNode } from '#core/tree-node';
import { StarLabelVisibility } from '#core-layer/star-label-visibility';
import { newTreeNode } from '#core/tree-node.spec';

describe('ViewportEventService', () => {

  let service: LayersEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LayersEventService] });
    service = TestBed.get(LayersEventService);
  });

  it('#layersTreeLoaded should broadcast event for the specified tree', () => {
    const tree = newTreeNode('root', []);
    const subscribed = service.broadcastLayersTreeLoaded$.subscribe(
      (broadcastedTree: TreeNode) => {
        expect(broadcastedTree).toBeDefined();
        expect(broadcastedTree.code).toBe('root');
      }
    );
    service.layersTreeLoaded(tree);
    subscribed.unsubscribe();
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
    const params = newTreeNode('test_layer_2', []);
    const subscribed = service.requestLayerLoad$.subscribe(
      (l: TreeNode) => expect(l).toBe(params)
    );
    service.loadLayerRequested(params);
    subscribed.unsubscribe();
  });

  it('#layerVisibleRequested should broadcast event for the specified params', () => {
    const layer = newTreeNode('layer', []);
    layer.selected = false;
    const subscribed = service.requestLayerVisibility$.subscribe(
      (broadcastedNode: TreeNode) => {
        expect(broadcastedNode).toBeDefined();
        expect(broadcastedNode.code).toBe(layer.code);
        expect(broadcastedNode.selected).toBeFalsy();
      }
    );
    service.layerVisibleRequested(layer);
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
