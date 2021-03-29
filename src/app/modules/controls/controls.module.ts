import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { GoToComponent } from '#controls/components/go-to/go-to.component';
import { LayersComponent } from '#controls/components/layers/layers.component';
import { ResizeControlsComponent } from '#controls/components/resize-controls/resize-controls.component';
import { SelectorLayerComponent } from '#controls/components/selector-layer/selector-layer.component';
import { SelectorStarMagnitudeComponent } from '#controls/components/selector-star-magnitude/selector-star-magnitude.component';
import { SelectorStarNamesComponent } from '#controls/components/selector-star-names/selector-star-names.component';
import { SelectorThemeComponent } from '#controls/components/selector-theme/selector-theme.component';
import { DraggableElementsHandler } from '#controls/services/draggable-elements-handler';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SliderModule
  ],
  declarations: [
    CameraControlsComponent,
    ControlsComponent,
    GoToComponent,
    LayersComponent,
    ResizeControlsComponent,
    SelectorStarMagnitudeComponent,
    SelectorStarNamesComponent,
    SelectorThemeComponent,
    SelectorLayerComponent
  ],
  exports: [
    ControlsComponent
  ],
  providers: [
    DraggableElementsHandler
  ]
})
export class ControlsModule {

}
