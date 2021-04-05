import { TestBed } from '@angular/core/testing';
import { ViewportService } from '#core/services/viewport.service';
import { ResizeControlsComponent } from '#controls/components/resize-controls/resize-controls.component';
import { CoreModule } from '#core/core.module';
import { ControlsModule } from '#controls/controls.module';

describe('ResizeControlsComponent', () => {

  let component: ResizeControlsComponent;
  let viewportService: ViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ControlsModule
      ]
    });
    viewportService = TestBed.inject(ViewportService);
    component = TestBed.createComponent(ResizeControlsComponent).componentInstance;
  });

  describe('resizeViewport should', () => {

    it('resize the viewport to defaults if width and height are not defined', () => {
      component.width = undefined;
      component.height = undefined;

      component.resizeViewport();
      expect(viewportService.width).toEqual(viewportService.defaultWidth);
      expect(viewportService.height).toEqual(viewportService.defaultHeight);
    });

    it('resize the viewport to expected values', () => {
      const width = 100;
      const height = 200;
      component.width = width;
      component.height = height;

      component.resizeViewport();
      expect(viewportService.width).toEqual(width);
      expect(viewportService.height).toEqual(height);
    });

  });

});
