import { NgModule } from '@angular/core';
import { ViewportComponent } from '#viewport/components/viewport/viewport.component';
import { WorldOriginCameraService } from '#viewport/services/world-origin-camera.service';
import { SceneManager } from '#viewport/services/scene-manager';
import { MouseEventsHandler } from '#viewport/services/mouse-events-handler';
import { LabelsVisibilityManager } from '#viewport/services/labels-visibility-manager';

@NgModule({
  declarations: [
    ViewportComponent
  ],
  exports: [
    ViewportComponent
  ],
  providers: [
    WorldOriginCameraService,
    SceneManager,
    MouseEventsHandler,
    LabelsVisibilityManager
  ]
})
export class ViewportModule {

}
