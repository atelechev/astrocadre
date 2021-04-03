import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CameraService } from '#core/services/camera.service';
import { EventsService } from '#core/services/events.service';
import { LayerService } from '#core/services/layer.service';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { MouseEventsHandler } from '#core/services/mouse-events-handler';
import { SceneService } from '#core/services/scene.service';
import { SearchService } from '#core/services/search.service';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { ViewportService } from '#core/services/viewport.service';
import { LoaderService } from '#core/services/loader.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CameraService,
    EventsService,
    LayersFactoryService,
    LayerService,
    LoaderService,
    MouseEventsHandler,
    SceneService,
    SearchService,
    StaticDataService,
    ThemeService,
    ViewportService
  ]
})
export class CoreModule {

}
