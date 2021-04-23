import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
import { MessierProvidersService } from '#layer-messier/services/messier-providers.service';
import { MessierLayerFactoryService } from '#layer-messier/services/factories/messier-layer.factory.service';
import { SelectorMessierNamesComponent } from '#layer-messier/components/selector-messier-names/selector-messier-names.component';
import { CoreModule } from '#core/core.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    PrimeNgImportsModule
  ],
  providers: [
    MessierLayerFactoryService,
    MessierProvidersService
  ],
  declarations: [
    SelectorMessierNamesComponent
  ],
  exports: [
    SelectorMessierNamesComponent
  ]
})
export class LayerMessierModule {

}
