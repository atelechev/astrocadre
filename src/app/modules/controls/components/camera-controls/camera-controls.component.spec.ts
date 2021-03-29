import { fakeAsync } from '@angular/core/testing';
import { CameraControlsComponent } from 'src/app/modules/controls/components/camera-controls/camera-controls.component';
import { CameraService } from 'src/app/modules/core/services/camera.service';
import { TestContext } from 'src/app/modules/core/test-utils/test-context.spec';

describe('CameraControlsComponent', () => {

  let ctx: TestContext;
  let component: CameraControlsComponent;
  let cameraService: CameraService;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(CameraControlsComponent)
      .configure();
    component = ctx.getComponent(CameraControlsComponent);
    cameraService = ctx.cameraService;
  }));

  it('selectedStep should return expected value', () => {
    expect(component.selectedStep).toEqual(10);
  });

  it('changeFov should trigger a change of the field of view', () => {
    spyOn(cameraService, 'setFoV');
    component.changeFov();
    expect(cameraService.setFoV).toHaveBeenCalledTimes(1);
  });

  it('stepClockwise should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepClockwise();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('stepCounterClockwise should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepCounterClockwise();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('stepUp should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepUp();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('stepDown should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepDown();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('stepLeft should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepLeft();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('stepRight should trigger a rotation of the view', () => {
    spyOn(cameraService, 'rotate');
    component.stepRight();
    expect(cameraService.rotate).toHaveBeenCalledTimes(1);
  });

  it('alignNSAxis should trigger an alignment of the view axis', () => {
    spyOn(cameraService, 'alignNSAxis');
    component.alignNSAxis();
    expect(cameraService.alignNSAxis).toHaveBeenCalledTimes(1);
  });

});
