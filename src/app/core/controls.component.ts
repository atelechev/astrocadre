import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: `app-sky-view-controls`,
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  providers: []
})
export class ControlsComponent {

  @ViewChild('skyViewControls')
  private skyViewControls: ElementRef;

  private isDragged: boolean;


  public drag(event: MouseEvent): void {
    if (this.isDragged) {
      const item = <HTMLElement> this.skyViewControls.nativeElement;
      const positionBefore = item.getBoundingClientRect();
      item.style.left = (positionBefore.left + event.movementX) + 'px';
      item.style.top = (positionBefore.top + event.movementY) + 'px';
    }
  }

  public setPressed(): void {
    this.isDragged = true;
  }

  public setReleased(): void {
    this.isDragged = false;
  }

}
