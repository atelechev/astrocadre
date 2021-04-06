import { NgModule } from '@angular/core';
import { AstrocadreComponent } from 'src/app/components/astrocadre/astrocadre.component';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';

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
    ControlsModule,
    LayerSkyGridModule, // TODO remove when loaded dynamically
    LayerConstellationsModule
  ],
  bootstrap: [AstrocadreComponent]
})
export class AppModule {

}
