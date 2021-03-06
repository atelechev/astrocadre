import { NgModule } from '@angular/core';
import { AstrocadreComponent } from 'src/app/components/astrocadre/astrocadre.component';
import { LayerSolarSystemModule } from '#layer-solar-system/layer-solar-system.module';
import { LayerMessierModule } from '#layer-messier/layer-messier.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';

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
    LayerSkyGridModule,
    LayerConstellationsModule,
    LayerSolarSystemModule,
    LayerStarsModule,
    LayerMessierModule
  ],
  bootstrap: [AstrocadreComponent]
})
export class AppModule {

}
