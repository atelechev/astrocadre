import { fakeAsync } from '@angular/core/testing';
import { ControlsComponent } from 'src/app/modules/controls/components/controls/controls.component';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';


describe('ControlsComponent', () => {

  let ctx: TestContext;
  let component: ControlsComponent;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withFullUI()
      .forComponent(ControlsComponent)
      .configure();
    component = ctx.getComponent(ControlsComponent);
  }));

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
