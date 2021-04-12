import { NgModule } from '@angular/core';
import { MessierLayerFactoryService } from 'src/app/modules/layer-messier/services/factories/messier-layer.factory.service';
import { MessierProvidersService } from 'src/app/modules/layer-messier/services/messier-providers.service';
import { CoreModule } from '#core/core.module';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    MessierLayerFactoryService,
    MessierProvidersService
  ]
})
export class LayerMessierModule {

}
