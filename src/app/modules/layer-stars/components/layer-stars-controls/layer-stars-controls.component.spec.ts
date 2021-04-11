import { TestBed } from '@angular/core/testing';
import { CoreModule } from '#core/core.module';
import { LayerStarsControlsComponent } from '#layer-stars/components/layer-stars-controls/layer-stars-controls.component';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';


describe('LayerStarsControlsComponent', () => {

  let component: LayerStarsControlsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        LayerStarsModule
      ]
    });
    component = TestBed.createComponent(LayerStarsControlsComponent).componentInstance;
  });

  it('should be created successfully', () => {
    expect(component).toBeDefined();
  });

});
