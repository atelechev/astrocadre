import { TestBed } from '@angular/core/testing';
import { CameraService } from '#core/services/camera.service';
import { CameraControlsComponent } from '#controls/components/camera-controls/camera-controls.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';

describe('CameraControlsComponent', () => {

  let component: CameraControlsComponent;
  let cameraService: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    component = TestBed.createComponent(CameraControlsComponent).componentInstance;
    cameraService = TestBed.inject(CameraService);
  });

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
