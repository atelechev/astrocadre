import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AstrocadreComponent } from 'src/app/components/astrocadre/astrocadre.component';
import { ControlsModule } from 'src/app/modules/controls/controls.module';
import { CoreModule } from 'src/app/modules/core/core.module';


@NgModule({
  declarations: [
    AstrocadreComponent
  ],
  exports: [
    AstrocadreComponent
  ],
  imports: [
    CoreModule,
    ControlsModule
  ],
  bootstrap: [AstrocadreComponent]
})
export class AppModule {

}
