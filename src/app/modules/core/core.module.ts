import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CameraService } from '#core/services/camera.service';
import { LayerService } from '#core/services/layer.service';
import { MouseEventsHandler } from '#core/services/mouse-events-handler';
import { SceneService } from '#core/services/scene.service';
import { SearchService } from '#core/services/search.service';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { ViewportService } from '#core/services/viewport.service';
import { LayersVisibilityManagerService } from '#core/services/visibility/layers-visibility-manager.service';
import { TextsVisibilityManagerService } from '#core/services/visibility/texts-visibility-manager.service';

/**
 * Contains the core entities of the application, which provide
 * its main functionalities.
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CameraService,
    LayerService,
    LayersVisibilityManagerService,
    MouseEventsHandler,
    SceneService,
    SearchService,
    StaticDataService,
    TextsVisibilityManagerService,
    ThemeService,
    ViewportService
  ]
})
export class CoreModule {

}
