import { NgModule } from '@angular/core';
import { AstrocadreComponent } from 'src/app/components/astrocadre/astrocadre.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';

/**
 * The root module of the application.
 */
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
