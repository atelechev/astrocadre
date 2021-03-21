import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { CameraControlsComponent } from 'src/app/modules2/controls/components/camera-controls/camera-controls.component';
import { ControlsComponent } from 'src/app/modules2/controls/components/controls/controls.component';
import { GoToComponent } from 'src/app/modules2/controls/components/go-to/go-to.component';
import { LayersComponent } from 'src/app/modules2/controls/components/layers/layers.component';
import { ResizeControlsComponent } from 'src/app/modules2/controls/components/resize-controls/resize-controls.component';
import { SelectorLayerComponent } from 'src/app/modules2/controls/components/selector-layer/selector-layer.component';
import { SelectorStarMagnitudeComponent } from 'src/app/modules2/controls/components/selector-star-magnitude/selector-star-magnitude.component';
import { SelectorStarNamesComponent } from 'src/app/modules2/controls/components/selector-star-names/selector-star-names.component';
import { SelectorThemeComponent } from 'src/app/modules2/controls/components/selector-theme/selector-theme.component';
import { DraggableElementsHandler } from 'src/app/modules2/controls/services/draggable-elements-handler';

@NgModule({
  imports: [
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
