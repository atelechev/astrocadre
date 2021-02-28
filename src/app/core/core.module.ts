import { NgModule } from '@angular/core';
import { CoreComponent } from '#core/core.component';
import { StaticDataService } from '#core/static-data-service';
import { TreeNodeFinder } from '#core/tree-node-finder';
import { DraggableElementsHandler } from '#core-controls/draggable-elements-handler';
import { LayersTreeValidator } from '#core-layer/layers-tree-validator';
import { SearchService } from '#core-search/search.service';
import { ThemesEventService } from '#core-theme/themes-event.service';
import { ViewportDimensionService } from '#core-viewport/viewport-dimension.service';
import { ViewportEventService } from '#core-viewport/viewport-event.service';
import { LayersEventService } from '#core-layer/layers-event.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  exports: [
    CoreComponent
  ],
  providers: [
    CoreComponent,
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
