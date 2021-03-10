import { NgModule } from '@angular/core';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { LayersFactoryService } from 'src/app/modules2/core/services/layers-factory.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { MouseEventsHandler } from 'src/app/modules2/core/services/mouse-events-handler';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';

@NgModule({
  providers: [
    CameraService,
    EventsService,
    LayersFactoryService,
    LayerService,
    MaterialsService,
    MouseEventsHandler,
    SceneService,
    StaticDataService,
    ThemeService,
    ViewportService
  ]
})
export class CoreModule {

}
