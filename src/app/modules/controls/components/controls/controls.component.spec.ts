import { TestBed } from '@angular/core/testing';
import { LayerMessierModule } from 'src/app/modules/layer-messier/layer-messier.module';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';
import { LayerSkyGridModule } from '#layer-sky-grid/layer-sky-grid.module';
import { LayerStarsModule } from '#layer-stars/layer-stars.module';
import { LayerConstellationsModule } from '#layer-constellations/layer-constellations.module';


describe('ControlsComponent', () => {

  let component: ControlsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule,
        LayerSkyGridModule,
        LayerStarsModule,
        LayerConstellationsModule,
        LayerMessierModule
      ]
    });
    component = TestBed.createComponent(ControlsComponent).componentInstance;
  });

  it('toolsExpanded should return false by default', () => {
    expect(component.toolsExpanded).toBeFalse();
  });

  it('toggleTools should change the value of toolsExpanded on each call', () => {
    component.toggleTools();
    expect(component.toolsExpanded).toBeTrue();
    component.toggleTools();
    expect(component.toolsExpanded).toBeFalse();
  });

});
