import { NgModule } from '@angular/core';
import { CoreModule } from '#core/core.module';
import { StarsVisibilityManagerService } from '#layer-stars/services/stars-visibility-manager.service';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [
    StarsVisibilityManagerService
  ]
})
export class LayerStarsModule {

}
