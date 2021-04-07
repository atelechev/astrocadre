import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { LoaderService } from '#controls/services/loader.service';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { GoToComponent } from '#controls/components/go-to/go-to.component';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { ResizeControlsComponent } from '#controls/components/resize-controls/resize-controls.component';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { DraggableElementsHandler } from '#controls/services/draggable-elements-handler';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';

/**
 * Contains all the elements of the application that represent
 * visual control elements and other UI tools.
 */
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PrimeNgImportsModule,
    LayerStarsModule
  ],
  declarations: [
    CameraControlsComponent,
    ControlsComponent,
    GoToComponent,
    LayersComponent,
    ResizeControlsComponent,
    SelectorThemeComponent,
    SelectorLayerComponent
  ],
  exports: [
    ControlsComponent
  ],
  providers: [
    DraggableElementsHandler,
    LoaderService
  ]
})
export class ControlsModule {

}
