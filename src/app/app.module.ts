import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AstrocadreComponent } from 'src/app/components/astrocadre/astrocadre.component';
import { CoreModule } from 'src/app/modules2/core/core.module';


@NgModule({
  declarations: [
    AstrocadreComponent
  ],
  exports: [
    AstrocadreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule
  ],
  bootstrap: [AstrocadreComponent]
})
export class AppModule {

}
