import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CameraService } from 'src/app/modules/core/services/camera.service';
import { EventsService } from 'src/app/modules/core/services/events.service';
import { LayerService } from 'src/app/modules/core/services/layer.service';
import { LayersFactoryService } from 'src/app/modules/core/services/layers-factory.service';
import { MaterialsService } from 'src/app/modules/core/services/materials.service';
import { MouseEventsHandler } from 'src/app/modules/core/services/mouse-events-handler';
import { SceneService } from 'src/app/modules/core/services/scene.service';
import { SearchService } from 'src/app/modules/core/services/search.service';
import { StaticDataService } from 'src/app/modules/core/services/static-data.service';
import { ThemeService } from 'src/app/modules/core/services/theme.service';
import { ViewportService } from 'src/app/modules/core/services/viewport.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CameraService,
    EventsService,
    LayersFactoryService,
    LayerService,
    MaterialsService,
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
