import { TestBed } from '@angular/core/testing';
import { ControlsComponent } from '#controls/components/controls/controls.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';


describe('ControlsComponent', () => {

  let component: ControlsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    component = TestBed.createComponent(ControlsComponent).componentInstance;
  });

  it('toolsExpanded should return true by default', () => {
    expect(component.toolsExpanded).toBeTrue();
  });

  it('toggleTools should change the value of toolsExpanded on each call', () => {
    component.toggleTools();
    expect(component.toolsExpanded).toBeFalse();
    component.toggleTools();
    expect(component.toolsExpanded).toBeTrue();
  });

});
