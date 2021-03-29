import { fakeAsync } from '@angular/core/testing';
import { TestContext } from '#core/test-utils/test-context.spec';
import { ControlsComponent } from '#controls/components/controls/controls.component';


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
