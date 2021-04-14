import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectorMessierNamesComponent } from 'src/app/modules/layer-messier/components/selector-messier-names/selector-messier-names.component';
import { MessierLayerFactoryService } from 'src/app/modules/layer-messier/services/factories/messier-layer.factory.service';
import { MessierProvidersService } from 'src/app/modules/layer-messier/services/messier-providers.service';
import { PrimeNgImportsModule } from 'src/app/primeng-imports.module';
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
