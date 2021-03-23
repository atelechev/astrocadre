import { NgModule } from '@angular/core';
import { WorldOriginCameraService } from '#viewport/services/world-origin-camera.service';
import { SceneManager } from '#viewport/services/scene-manager';
import { MouseEventsHandler } from '#viewport/services/mouse-events-handler';
import { LabelsVisibilityManager } from '#viewport/services/labels-visibility-manager';

@NgModule({
  providers: [
    WorldOriginCameraService,
    SceneManager,
    MouseEventsHandler,
    LabelsVisibilityManager
  ]
})
export class ViewportModule {

}
