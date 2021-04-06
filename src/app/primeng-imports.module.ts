import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';


@NgModule({
  imports: [
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SliderModule
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SliderModule
  ]
})
export class PrimeNgImportsModule {

}
