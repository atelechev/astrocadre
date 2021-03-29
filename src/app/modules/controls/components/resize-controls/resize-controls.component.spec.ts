import { fakeAsync } from '@angular/core/testing';
import { ViewportService } from '#core/services/viewport.service';
import { TestContext } from '#core/test-utils/test-context.spec';
import { ResizeControlsComponent } from '#controls/components/resize-controls/resize-controls.component';

describe('ResizeControlsComponent', () => {

  let ctx: TestContext;
  let component: ResizeControlsComponent;
  let viewportService: ViewportService;

  beforeEach(fakeAsync(() => {
    ctx = new TestContext()
      .withUIImports()
      .forComponent(ResizeControlsComponent)
      .configure();
    viewportService = ctx.viewportService;
    component = ctx.getComponent(ResizeControlsComponent);
  }));

  describe('resizeViewport should', () => {

    it('resize the viewport to defaults if width and height are not defined', fakeAsync(() => {
      component.width = undefined;
      component.height = undefined;

      component.resizeViewport();
      expect(viewportService.width).toEqual(viewportService.defaultWidth);
      expect(viewportService.height).toEqual(viewportService.defaultHeight);
    }));

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
