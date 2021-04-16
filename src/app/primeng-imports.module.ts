import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';


@NgModule({
  imports: [
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SidebarModule,
    SliderModule
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SidebarModule,
    SliderModule
  ]
})
export class PrimeNgImportsModule {

}
