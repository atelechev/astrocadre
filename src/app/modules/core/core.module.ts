import { NgModule } from '@angular/core';
import { DraggableElementsHandler } from '#core/services/draggable-elements-handler';
import { LayersEventService } from '#core/services/layers-event.service';
import { LayersTreeValidator } from '#core/services/layers-tree-validator';
import { SearchService } from '#core/services/search.service';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemesEventService } from '#core/services/themes-event.service';
import { TreeNodeFinder } from '#core/services/tree-node-finder';
import { ViewportDimensionService } from '#core/services/viewport-dimension.service';
import { ViewportEventService } from '#core/services/viewport-event.service';

@NgModule({
  providers: [
    StaticDataService,
    ThemesEventService,
    ViewportEventService,
    LayersEventService,
    SearchService,
    ViewportDimensionService,
    DraggableElementsHandler,
    LayersTreeValidator,
    TreeNodeFinder
  ]
})
export class CoreModule {

}